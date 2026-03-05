'use client';

import type { ReactNode } from 'react';
import { Ssgoi, type SsgoiConfig } from '@ssgoi/react';
import { drill, depth, swap } from '@ssgoi/react/view-transitions';
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
      symmetric: true, // 뒤로가기 시 자동으로 exit 방향 적용
    },
    // 아카이버 홈 <-> 장소 정보
    {
      from: '/archiver/home',
      to: '/archiver/place-info/*',
      transition: drill({ direction: 'enter' }),
    },
    {
      from: '/archiver/place-info/*',
      to: '/archiver/home',
      transition: drill({ direction: 'exit' }),
    },
    // 아카이버 홈 <-> 에디터 프로필
    {
      from: '/archiver/home',
      to: '/archiver/editor-profile/*',
      transition: swap(),
    },
    {
      from: '/archiver/editor-profile/*',
      to: '/archiver/home',
      transition: swap(),
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
      transition: swap(),
      symmetric: true,
    },
    {
      from: '/archiver/home',
      to: '/archiver/my-archive',
      transition: swap(),
      symmetric: true,
    },
    {
      from: '/archiver/home',
      to: '/mypage',
      transition: swap(),
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
      transition: drill({ direction: 'exit' }),
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
  ],
};

export function SsgoiProvider({ children }: { children: ReactNode }): ReactNode {
  return (
    <Ssgoi config={ssgoiConfig} usePathname={usePathname}>
      <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>{children}</div>
    </Ssgoi>
  );
}
