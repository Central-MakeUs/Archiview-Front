import { transition } from './transition';
import type { LoginState, LoginEvent, LoginCommand } from './types';

export class LoginMachine {
  private state: LoginState = { tag: 'idle' };
  private listeners = new Set<(s: LoginState) => void>();
  private commandSink: (c: LoginCommand) => void = () => {};

  send(event: LoginEvent): void {
    const { state: next, commands } = transition(this.state, event);
    if (next !== this.state) {
      this.state = next;
      this.listeners.forEach((listener) => listener(next));
    }
    commands.forEach(this.commandSink);
  }

  subscribe(listener: (s: LoginState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  onCommand(handler: (c: LoginCommand) => void): void {
    this.commandSink = handler;
  }

  get snapshot(): LoginState {
    return this.state;
  }
}
