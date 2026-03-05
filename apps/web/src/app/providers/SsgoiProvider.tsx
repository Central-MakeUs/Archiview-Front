'use client';

import type { ReactNode } from 'react';
import { Ssgoi, type SsgoiConfig } from '@ssgoi/react';
import { drill, depth } from '@ssgoi/react/view-transitions';
import { usePathname } from 'next/navigation';

const ssgoiConfig: SsgoiConfig = {
  transitions: [
    {
      from: '/archiver/home',
      to: '/archiver/search-result',
      transition: depth({ direction: 'enter' }),
      symmetric: true, // 뒤로가기 시 자동으로 exit 방향 적용
    },
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
    {
      from: '/archiver/home',
      to: '/archiver/editor-profile/*',
      transition: drill({ direction: 'enter' }),
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
