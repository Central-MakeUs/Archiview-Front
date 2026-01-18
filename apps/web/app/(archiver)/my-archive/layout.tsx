import React from 'react';

import { BackButtonHeader } from '@/widgets/header/BackButtonHeader';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex h-dvh flex-col">
      <BackButtonHeader title="나의 아카이브" />
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
