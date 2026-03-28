import React from 'react';
import { getTranslations } from 'next-intl/server';

import { BackButtonHeader } from '@/widgets/header/BackButtonHeader';

export default async function FollowListLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const t = await getTranslations('archiverFollowList');

  return (
    <div className="flex h-dvh flex-col">
      <BackButtonHeader title={t('headerTitle')} />
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
