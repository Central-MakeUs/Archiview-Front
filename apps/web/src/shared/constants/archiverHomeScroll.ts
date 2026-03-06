'use client';

const ARCHIVER_HOME_SCROLL_BOTTOM_FLAG = 'archiver-home-scroll-bottom';

export function setArchiverHomeScrollBottomFlag(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(ARCHIVER_HOME_SCROLL_BOTTOM_FLAG, '1');
}

export function consumeArchiverHomeScrollBottomFlag(): boolean {
  if (typeof window === 'undefined') return false;

  const hasFlag = sessionStorage.getItem(ARCHIVER_HOME_SCROLL_BOTTOM_FLAG) === '1';
  if (hasFlag) {
    sessionStorage.removeItem(ARCHIVER_HOME_SCROLL_BOTTOM_FLAG);
  }

  return hasFlag;
}
