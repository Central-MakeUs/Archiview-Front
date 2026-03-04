'use client';

import { SsgoiTransition } from '@ssgoi/react';
import type { ReactNode } from 'react';

interface IPageTransitionProps {
  id: string;
  children: ReactNode;
}

export function PageTransition({ id, children }: IPageTransitionProps): ReactNode {
  return (
    <SsgoiTransition id={id} className="h-full">
      {children}
    </SsgoiTransition>
  );
}
