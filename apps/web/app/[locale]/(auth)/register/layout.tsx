import React from 'react';

import { BackButtonHeader } from '@/widgets/header/BackButtonHeader';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex h-dvh flex-col">
      <BackButtonHeader title="역할 선택" />
      <main className="flex-1 min-h-0 overflow-y-auto scroll-none">{children}</main>
    </div>
  );
}
