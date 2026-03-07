'use client';

import { useEffect, useState } from 'react';

const HOME_INITIAL_SWAP_INTRO_FLAG = 'home-initial-swap-intro-shown';

const shouldRunHomeInitialSwapIntro = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  const hasShownIntro = sessionStorage.getItem(HOME_INITIAL_SWAP_INTRO_FLAG) === '1';
  if (hasShownIntro) return false;

  sessionStorage.setItem(HOME_INITIAL_SWAP_INTRO_FLAG, '1');
  return true;
};

export const useHomeInitialSwapIntro = (): boolean => {
  const [isIntroEntered, setIsIntroEntered] = useState(() => !shouldRunHomeInitialSwapIntro());

  useEffect(() => {
    if (isIntroEntered) return;

    const rafId = window.requestAnimationFrame(() => {
      setIsIntroEntered(true);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [isIntroEntered]);

  return isIntroEntered;
};
