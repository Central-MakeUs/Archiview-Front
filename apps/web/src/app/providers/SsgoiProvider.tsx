'use client';

import type { ReactNode } from 'react';
import { Ssgoi, type SsgoiConfig } from '@ssgoi/react';
import { drill, depth, swap, snap } from '@ssgoi/react/view-transitions';
import { usePathname } from 'next/navigation';

const ssgoiConfig: SsgoiConfig = {
  transitions: [
    /**
     * @아카이버
     */
    {
      from: '/archiver/home',
      to: '/archiver/search-result',
      transition: depth({ direction: 'enter' }),
    },
    {
      from: '/archiver/search-result',
      to: '/archiver/home',
      transition: depth({ direction: 'exit' }),
    },
    // 아카이버 홈 <-> 장소 정보
    {
      from: '/archiver/home',
      to: '/archiver/place-info/*',
      transition: drill({ direction: 'enter' }),
    },
    {
      from: '/archiver/place-info',
      to: '/archiver/home',
      transition: drill({ direction: 'exit' }),
    },
    // 아카이버 홈 <-> 에디터 프로필
    {
      from: '/archiver/home',
      to: '/archiver/editor-profile/*',
      transition: snap(),
      symmetric: true,
    },
    // 아카이버 홈 <-> 카테고리
    {
      from: '/archiver/home',
      to: '/archiver/category',
      transition: drill({ direction: 'enter' }),
    },
    {
      from: '/archiver/category',
      to: '/archiver/home',
      transition: drill({ direction: 'exit' }),
    },
    // 아카이버-바텀네비
    {
      from: '/archiver/home',
      to: '/archiver/follow-list',
      transition: snap(),
      symmetric: true,
    },
    {
      from: '/archiver/home',
      to: '/archiver/my-archive',
      transition: snap(),
      symmetric: true,
    },
    {
      from: '/archiver/home',
      to: '/mypage',
      transition: snap(),
      symmetric: true,
    },
    {
      from: '/archiver/editor-profile/*',
      to: '/archiver/my-archive',
      transition: snap(),
      symmetric: true,
    },
    {
      from: '/archiver/editor-profile/*',
      to: '/mypage',
      transition: snap(),
      symmetric: true,
    },
    // 팔로우 -> 아카이버 프로필
    {
      from: '/archiver/follow-list',
      to: '/archiver/editor-profile/*',
      transition: drill({ direction: 'enter' }),
    },
    {
      from: '/archiver/editor-profile/*',
      to: '/archiver/follow-list',
      transition: swap(),
    },

    {
      from: '/archiver/editor-profile/*',
      to: '/archiver/place-info/*',
      transition: drill({ direction: 'enter' }),
    },
    {
      from: '/archiver/place-info/*',
      to: '/archiver/editor-profile/*',
      transition: drill({ direction: 'exit' }),
    },
    /**
     * @에디터
     */
    // 바텀네비
    {
      from: '/editor/home',
      to: '/editor/profile',
      transition: snap(),
      symmetric: true,
    },
    {
      from: '/editor/home',
      to: '/editor/register-place',
      transition: snap(),
      symmetric: true,
    },
    {
      from: '/editor/home',
      to: '/mypage',
      transition: snap(),
      symmetric: true,
    },
    {
      from: '/editor/profile',
      to: '/editor/register-place',
      transition: snap(),
      symmetric: true,
    },
    {
      from: '/editor/profile',
      to: '/mypage',
      transition: snap(),
      symmetric: true,
    },
    // 에디터 홈 <-> 장소 상세
    {
      from: '/editor/home',
      to: '/editor/place-info/*',
      transition: drill({ direction: 'enter' }),
    },
    {
      from: '/editor/place-info/*',
      to: '/editor/home',
      transition: drill({ direction: 'exit' }),
    },
    // 에디터 내 프로필 <-> 장소 상세
    {
      from: '/editor/profile',
      to: '/editor/place-info/*',
      transition: drill({ direction: 'enter' }),
    },
    {
      from: '/editor/place-info/*',
      to: '/editor/profile',
      transition: drill({ direction: 'exit' }),
    },
  ],
};

export function SsgoiProvider({ children }: { children: ReactNode }): ReactNode {
  return (
    <Ssgoi config={ssgoiConfig} usePathname={usePathname}>
      <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>{children}</div>
    </Ssgoi>
  );
}
