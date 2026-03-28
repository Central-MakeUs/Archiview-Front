import React from 'react';
import { getTranslations } from 'next-intl/server';

import { BackButtonHeader } from '@/widgets/header';

export default async function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const t = await getTranslations('editorRegisterPlace');

  return (
    <div className="flex h-dvh flex-col">
      <BackButtonHeader title={t('headerTitle')} />
      <main className="flex-1 min-h-0 overflow-y-auto scroll-none">{children}</main>
    </div>
  );
}
