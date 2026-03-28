import React from 'react';

import { LogoHeader } from '@/widgets/header';
import { EditorNavigationFooter } from '@/widgets/navigation/EditorNavigationFooter';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div
      className="flex h-full flex-col"
      style={{ '--navigation-footer-height': '72px' } as React.CSSProperties}
    >
      <LogoHeader />
      <main className="flex-1 min-h-0 overflow-y-auto scroll-none">{children}</main>
      <EditorNavigationFooter />
    </div>
  );
}
