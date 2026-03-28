import React from 'react';

import { BackButtonHeader } from '@/widgets/header/BackButtonHeader';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex h-dvh flex-col">
      <BackButtonHeader title="차단한 에디터 관리" />
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
