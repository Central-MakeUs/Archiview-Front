import { transition } from './transition';
import type { LoginState, LoginEvent, LoginCommand } from './types';

export class LoginMachine {
  private state: LoginState = { tag: 'idle' };

  send(event: LoginEvent): LoginCommand[] {
    const { state: next, commands } = transition(this.state, event);
    this.state = next;
    return commands;
  }

  get snapshot(): LoginState {
    return this.state;
  }
}
