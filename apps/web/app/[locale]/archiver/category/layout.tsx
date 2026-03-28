import React from 'react';

import { BackButtonHeader } from '@/widgets/header/BackButtonHeader';

export default function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex h-dvh flex-col">
      <BackButtonHeader title="" replaceTo="/archiver/home" />
      <main className="flex-1 min-h-0 overflow-y-auto scroll-none">{children}</main>
    </div>
  );
}
