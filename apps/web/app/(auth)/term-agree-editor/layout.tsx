import React from 'react';

import { BackButtonHeader } from '@/widgets/header';

export default function TermAgreeEditorLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex h-dvh flex-col">
      <BackButtonHeader title="약관동의" />
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
