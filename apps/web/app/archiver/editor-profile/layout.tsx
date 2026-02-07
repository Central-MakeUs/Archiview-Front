import React from 'react';

import { LogoHeader } from '@/widgets/header';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex h-dvh flex-col">
      <LogoHeader />
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
