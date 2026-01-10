/* eslint-disable no-void */
'use client';

import { useEffect } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      void import('@/mocks').then(({ startMSW }) => {
        return startMSW();
      });
    }
  }, []);

  return <>{children}</>;
}
