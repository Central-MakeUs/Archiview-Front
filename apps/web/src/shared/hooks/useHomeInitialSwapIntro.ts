'use client';

import { useEffect, useState } from 'react';

const HOME_INITIAL_SWAP_INTRO_FLAG = 'home-initial-swap-intro-shown';

/**
 * 첫 홈 진입 시에만 짧은 슬라이드 인트로. sessionStorage는 useEffect 안에서만 다룸
 * (useState 초기화에서 쓰면 Strict Mode 초기화 이중 호출 시 상태가 꼬여 opacity-0에 갇힐 수 있음).
 */
export const useHomeInitialSwapIntro = (): boolean => {
  const [isIntroEntered, setIsIntroEntered] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (sessionStorage.getItem(HOME_INITIAL_SWAP_INTRO_FLAG) === '1') {
      // Strict Mode: 첫 effect에서 false만 찍고 cleanup이 rAF를 취소한 뒤, 재실행 시 여기로 와서 복구해야 함
      setIsIntroEntered(true);
      return;
    }

    sessionStorage.setItem(HOME_INITIAL_SWAP_INTRO_FLAG, '1');
    setIsIntroEntered(false);

    const rafId = window.requestAnimationFrame(() => {
      setIsIntroEntered(true);
    });

    const safetyId = window.setTimeout(() => {
      setIsIntroEntered(true);
    }, 400);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(safetyId);
    };
  }, []);

  return isIntroEntered;
};
