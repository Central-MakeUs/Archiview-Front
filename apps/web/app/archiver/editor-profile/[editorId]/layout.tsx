import React from 'react';

import { LogoHeader } from '@/widgets/header';
import { ArchiverNavigationFooter } from '@/widgets/navigation/ArchiverNavigationFooter';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex h-dvh flex-col">
      <LogoHeader />
      <main className="flex-1 min-h-0 overflow-y-auto scroll-none">{children}</main>
      <ArchiverNavigationFooter activeKey="follow" />
    </div>
  );
}
