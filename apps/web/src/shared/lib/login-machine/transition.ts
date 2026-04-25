import type { LoginCommand, LoginEvent, LoginFailureReason, LoginState } from './types';

const MAX_RETRY = 2;

const backoffMs = (attempt: number): number => 500 * 2 ** (attempt - 1);

const shouldAutoRetry = (reason: LoginFailureReason): boolean => reason === 'serverError';

export function transition(
  state: LoginState,
  event: LoginEvent,
): { state: LoginState; commands: LoginCommand[] } {
  // idle + START → authenticating(0) + RUN_LOGIN_PIPELINE
  if (state.tag === 'idle' && event.type === 'START') {
    return {
      state: {
        tag: 'authenticating',
        provider: event.provider,
        platform: event.platform,
        attempt: 0,
      },
      commands: [
        { type: 'RUN_LOGIN_PIPELINE', provider: event.provider, platform: event.platform },
      ],
    };
  }

  // authenticating + SUCCESS → authenticating(유지) + PERSIST_AND_REDIRECT
  // 성공 직후 하드 리다이렉트로 페이지가 unmount되므로 succeeded 상태를 두지 않는다.
  if (state.tag === 'authenticating' && event.type === 'SUCCESS') {
    return {
      state,
      commands: [{ type: 'PERSIST_AND_REDIRECT', accessToken: event.accessToken }],
    };
  }

  if (state.tag === 'authenticating' && event.type === 'FAILURE') {
    // authenticating + FAILURE(userCancelled) → idle
    if (event.reason === 'userCancelled') {
      return { state: { tag: 'idle' }, commands: [] };
    }

    // authenticating + FAILURE(serverError, attempt<MAX) → retrying(attempt+1) + SCHEDULE_RETRY
    if (shouldAutoRetry(event.reason) && state.attempt < MAX_RETRY) {
      const nextAttempt = state.attempt + 1;
      return {
        state: {
          tag: 'retrying',
          provider: state.provider,
          platform: state.platform,
          attempt: nextAttempt,
          reason: event.reason,
        },
        commands: [
          {
            type: 'SCHEDULE_RETRY',
            provider: state.provider,
            platform: state.platform,
            attempt: nextAttempt,
            delayMs: backoffMs(nextAttempt), // attempt 1: 500ms, attempt 2: 1000ms
          },
        ],
      };
    }

    // authenticating + FAILURE(그 외 or 한도 초과) -> failed
    return { state: { tag: 'failed', reason: event.reason }, commands: [] };
  }

  // retrying + RETRY_TIMEOUT_FIRED -> authenticating(attempt 유지) + RUN_LOGIN_PIPELINE
  if (state.tag === 'retrying' && event.type === 'RETRY_TIMEOUT_FIRED') {
    return {
      state: {
        tag: 'authenticating',
        provider: state.provider,
        platform: state.platform,
        attempt: state.attempt,
      },
      commands: [
        { type: 'RUN_LOGIN_PIPELINE', provider: state.provider, platform: state.platform },
      ],
    };
  }

  // retrying + START → authenticating(0) + RUN_LOGIN_PIPELINE  (사용자가 다른 시도, 카운터 리셋)
  if (state.tag === 'retrying' && event.type === 'START') {
    return {
      state: {
        tag: 'authenticating',
        provider: event.provider,
        platform: event.platform,
        attempt: 0,
      },
      commands: [
        { type: 'RUN_LOGIN_PIPELINE', provider: event.provider, platform: event.platform },
      ],
    };
  }

  // retrying + RESET -> idle
  if (state.tag === 'retrying' && event.type === 'RESET') {
    return { state: { tag: 'idle' }, commands: [] };
  }

  // failed + START -> authenticating(0) + RUN_LOGIN_PIPELINE
  if (state.tag === 'failed' && event.type === 'START') {
    return {
      state: {
        tag: 'authenticating',
        provider: event.provider,
        platform: event.platform,
        attempt: 0,
      },
      commands: [
        { type: 'RUN_LOGIN_PIPELINE', provider: event.provider, platform: event.platform },
      ],
    };
  }

  // failed + RESET -> idle
  if (state.tag === 'failed' && event.type === 'RESET') {
    return { state: { tag: 'idle' }, commands: [] };
  }

  // 정의되지 않은 (state, event) 조합 -> 무시
  return { state, commands: [] };
}
