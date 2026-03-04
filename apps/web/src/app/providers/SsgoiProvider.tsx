'use client';

import type { ReactNode } from 'react';
import { Ssgoi, type SsgoiConfig } from '@ssgoi/react';
import { usePathname } from 'next/navigation';

const ssgoiConfig: SsgoiConfig = {
  transitions: [],
};

export function SsgoiProvider({ children }: { children: ReactNode }): ReactNode {
  return (
    <Ssgoi config={ssgoiConfig} usePathname={usePathname}>
      <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>{children}</div>
    </Ssgoi>
  );
}
