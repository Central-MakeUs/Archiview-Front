'use client';

import { SsgoiTransition } from '@ssgoi/react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLayoutEffect, type ReactNode } from 'react';

import { usePathname } from '@/shared/lib/i18n/navigation';
import { stripLocalePrefix } from '@/shared/lib/i18n/stripLocalePrefix';

/** SSGOI 대신 쓰는 기본 입장 전환 (본문 `<main>` 안만 움직임 — 레이아웃 헤더/풋터는 그대로) */
const SOFT_ENTER = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
};

function SoftPageEnter({ transitionId, children }: { transitionId: string; children: ReactNode }): ReactNode {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className="h-full min-h-0">{children}</div>;
  }

  return (
    <motion.div
      key={transitionId}
      className="h-full min-h-0"
      initial={SOFT_ENTER.initial}
      animate={SOFT_ENTER.animate}
      transition={SOFT_ENTER.transition}
    >
      {children}
    </motion.div>
  );
}

/**
 * SSGOI는 매칭 전환 시 초기에 `visibility: hidden`을 주고 애니메이션 `onReady`에서 푼다.
 * Next 클라이언트 네비/리렌더 조합에서 `onReady`가 생략되거나, 이후 렌더에서 다시 막히면 본문이 하얗게 남는다.
 */
const SSGOI_VISIBILITY_FIRST_CHECK_MS = 480;
const SSGOI_VISIBILITY_RETRY_MS = 200;
const SSGOI_VISIBILITY_MAX_ATTEMPTS = 12;

function SsgoiVisibilityFallback({ transitionId }: { transitionId: string }) {
  const pathname = usePathname();
  const pathKey = pathname ? stripLocalePrefix(pathname) : '';

  useLayoutEffect(() => {
    const sel = `[data-ssgoi-transition="${CSS.escape(transitionId)}"]`;
    let cancelled = false;
    let attempts = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const unblockIfStuck = () => {
      if (cancelled) return;
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el && getComputedStyle(el).visibility === 'hidden') {
        el.style.setProperty('visibility', 'visible', 'important');
      }
    };

    const step = () => {
      if (cancelled || attempts >= SSGOI_VISIBILITY_MAX_ATTEMPTS) return;
      attempts += 1;
      unblockIfStuck();
      timeoutId = window.setTimeout(step, SSGOI_VISIBILITY_RETRY_MS);
    };

    timeoutId = window.setTimeout(step, SSGOI_VISIBILITY_FIRST_CHECK_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [pathKey, transitionId]);

  return null;
}

interface IPageTransitionProps {
  id: string;
  children: ReactNode;
  /**
   * Next.js 클라이언트 경로 + SSGOI 조합에서 `visibility`가 풀리지 않아 본문이 비는 버그가 잦음.
   * 기본은 꺼 둠 → 대신 {@link SoftPageEnter}로 짧은 페이드·슬라이드 입장만 적용.
   * SSGOI 스프링 전환이 필요하면 `disableSsgoi={false}` (간헐적 이슈 가능).
   */
  disableSsgoi?: boolean;
  /** 기본 전(framer 입장)도 끄고 싶을 때만 `true` */
  disableSoftEnter?: boolean;
}

export function PageTransition({
  id,
  children,
  disableSsgoi = true,
  disableSoftEnter = false,
}: IPageTransitionProps): ReactNode {
  if (disableSsgoi) {
    if (disableSoftEnter) {
      return <div className="h-full min-h-0">{children}</div>;
    }
    return <SoftPageEnter transitionId={id}>{children}</SoftPageEnter>;
  }

  return (
    <SsgoiTransition id={id} className="h-full">
      <SsgoiVisibilityFallback transitionId={id} />
      {children}
    </SsgoiTransition>
  );
}
