import type { LoginState, LoginEvent, LoginCommand } from './types';

export function transition(
  state: LoginState,
  event: LoginEvent,
): { state: LoginState; commands: LoginCommand[] } {
  if (state.tag === 'idle' && event.type === 'START') {
    return {
      state: { tag: 'authenticating', provider: event.provider, platform: event.platform },
      commands: [
        { type: 'RUN_LOGIN_PIPELINE', provider: event.provider, platform: event.platform },
      ],
    };
  }

  if (state.tag === 'authenticating' && event.type === 'SUCCESS') {
    return {
      state,
      commands: [{ type: 'PERSIST_AND_REDIRECT', accessToken: event.accessToken }],
    };
  }

  if (state.tag === 'authenticating' && event.type === 'FAILURE') {
    return {
      state: { tag: 'failed', reason: event.reason },
      commands: [],
    };
  }

  if (state.tag === 'failed' && event.type === 'START') {
    return {
      state: { tag: 'authenticating', provider: event.provider, platform: event.platform },
      commands: [
        { type: 'RUN_LOGIN_PIPELINE', provider: event.provider, platform: event.platform },
      ],
    };
  }

  if (state.tag === 'failed' && event.type === 'RESET') {
    return {
      state: { tag: 'idle' },
      commands: [],
    };
  }

  return { state, commands: [] };
}
