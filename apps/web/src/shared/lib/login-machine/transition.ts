import type { LoginState, LoginEvent } from './types';

export function transition(state: LoginState, event: LoginEvent): LoginState {
  if (state.tag === 'idle' && event.type === 'START') {
    return { tag: 'authenticating', provider: event.provider, platform: event.platform };
  }

  if (state.tag === 'authenticating' && event.type === 'FAILURE') {
    return { tag: 'failed', reason: event.reason };
  }

  if (state.tag === 'failed' && event.type === 'START') {
    return { tag: 'authenticating', provider: event.provider, platform: event.platform };
  }

  if (state.tag === 'failed' && event.type === 'RESET') {
    return { tag: 'idle' };
  }

  return state;
}
