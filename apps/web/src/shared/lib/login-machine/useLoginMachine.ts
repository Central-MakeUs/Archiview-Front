'use client';

import { useRef, useSyncExternalStore } from 'react';

import { LoginMachine } from './machine';
import { useLoginRunner } from './useLoginRunner';
import type { LoginEvent, LoginState } from './types';

export const useLoginMachine = (): {
  state: LoginState;
  send: (event: LoginEvent) => void;
} => {
  const machineRef = useRef<LoginMachine | null>(null);
  if (!machineRef.current) {
    machineRef.current = new LoginMachine();
  }
  const machine = machineRef.current;

  useLoginRunner(machine);

  const state = useSyncExternalStore(
    (listener) => machine.subscribe(listener),
    () => machine.snapshot,
    () => machine.snapshot,
  );

  return {
    state,
    send: (event) => machine.send(event),
  };
};
