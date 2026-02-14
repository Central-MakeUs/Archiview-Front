'use client';

import { useAuthGate } from '@/app/hooks/useAuthGate';

export default function Page() {
  useAuthGate();

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <p className="body-14-regular text-neutral-60">이동중...</p>
    </main>
  );
}
