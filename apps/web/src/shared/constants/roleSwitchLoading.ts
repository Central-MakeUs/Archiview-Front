'use client';

const ROLE_SWITCH_LOADING_FLAG = 'role-switch-loading';

export function setRoleSwitchLoadingFlag(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(ROLE_SWITCH_LOADING_FLAG, '1');
}

export function consumeRoleSwitchLoadingFlag(): boolean {
  if (typeof window === 'undefined') return false;

  const hasFlag = sessionStorage.getItem(ROLE_SWITCH_LOADING_FLAG) === '1';
  if (hasFlag) {
    sessionStorage.removeItem(ROLE_SWITCH_LOADING_FLAG);
  }

  return hasFlag;
}
