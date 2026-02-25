'use client';

import { useAuthGate } from '@/app/hooks/useAuthGate';

export const RootRedirectPage = () => {
  useAuthGate();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-40 border-t-transparent" />
    </div>
  );
};
