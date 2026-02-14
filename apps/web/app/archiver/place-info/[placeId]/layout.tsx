import React from 'react';

import { ArchiverNavigationFooter } from '@/widgets/navigation/ArchiverNavigationFooter';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex h-dvh flex-col">
      {/* <BackButtonHeader title="" /> */}
      <main className="flex-1 min-h-0 overflow-y-auto scroll-none pb-18">{children}</main>
      {/* <ArchiverNavigationFooter /> */}
    </div>
  );
}
