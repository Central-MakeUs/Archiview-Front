'use client';

import { Ssgoi, type SsgoiConfig } from '@ssgoi/react';
import { drill, fade, swap } from '@ssgoi/react/view-transitions';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const ARCHIVER_TAB_ROUTES = [
  '/archiver/home',
  '/archiver/follow-list',
  '/archiver/my-archive',
  '/mypage',
];
const EDITOR_TAB_ROUTES = ['/editor/home', '/editor/profile', '/editor/register-place', '/mypage'];
const SCROLL_RESET_PATTERNS = [
  '/login',
  '/login/trial',
  '/register',
  '/register-editor',
  '/register-finish',
  '/term-agree',
  '/term-agree-editor',
  '/blocked-editor',
  '/mypage/edit-profile',
  '/archiver/place-info/*',
  '/archiver/editor-profile/*',
  '/editor/place-info/*',
];

function createSwapTransitions(routes: readonly string[]): NonNullable<SsgoiConfig['transitions']> {
  return routes.flatMap((from) =>
    routes
      .filter((to) => to !== from)
      .map((to) => ({
        from,
        to,
        transition: swap(),
      })),
  );
}

const ssgoiConfig: SsgoiConfig = {
  defaultTransition: fade(),
  experimentalPreserveScroll: true,
  scrollResetPatterns: SCROLL_RESET_PATTERNS,
  transitions: [
    ...createSwapTransitions(ARCHIVER_TAB_ROUTES),
    ...createSwapTransitions(EDITOR_TAB_ROUTES),
    { from: '*', to: '/archiver/search-result', transition: drill({ direction: 'enter' }) },
    { from: '/archiver/search-result', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/archiver/category', transition: drill({ direction: 'enter' }) },
    { from: '/archiver/category', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/archiver/place-info/*', transition: drill({ direction: 'enter' }) },
    { from: '/archiver/place-info/*', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/archiver/editor-profile/*', transition: drill({ direction: 'enter' }) },
    { from: '/archiver/editor-profile/*', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/editor/place-info/*', transition: drill({ direction: 'enter' }) },
    { from: '/editor/place-info/*', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/mypage/edit-profile', transition: drill({ direction: 'enter' }) },
    { from: '/mypage/edit-profile', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/blocked-editor', transition: drill({ direction: 'enter' }) },
    { from: '/blocked-editor', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/register', transition: drill({ direction: 'enter' }) },
    { from: '/register', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/term-agree', transition: drill({ direction: 'enter' }) },
    { from: '/term-agree', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/term-agree-editor', transition: drill({ direction: 'enter' }) },
    { from: '/term-agree-editor', to: '*', transition: drill({ direction: 'exit' }) },
    { from: '*', to: '/register-editor', transition: drill({ direction: 'enter' }) },
    { from: '/register-editor', to: '*', transition: drill({ direction: 'exit' }) },
  ],
  skipAnimationOnBack: ['ios'],
};

export function SsgoiProvider({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <Ssgoi config={ssgoiConfig} usePathname={usePathname}>
      <div className="relative z-0 overflow-x-clip">{children}</div>
    </Ssgoi>
  );
}
