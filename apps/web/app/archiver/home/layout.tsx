import React from 'react';

import { Header } from '@/widgets/header';
import { ArchiviewLogoIcon } from '@/shared/ui/icon';
import { ArchiverNavigationFooter } from '@/widgets/navigation/ArchiverNavigationFooter';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div
      className="flex h-dvh flex-col"
      style={{ '--navigation-footer-height': '72px' } as React.CSSProperties}
    >
      <Header left={<ArchiviewLogoIcon />} />
      <main className="flex-1 min-h-0 overflow-y-auto scroll-none">{children}</main>
      <ArchiverNavigationFooter />
    </div>
  );
}
