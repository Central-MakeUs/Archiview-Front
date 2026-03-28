import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageTransition } from '@/app/providers/PageTransition';
import { FollowListPage } from '@/pages/archiver/follow-list';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('archiverFollowList');
  return { title: t('metadata.title') };
}

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/archiver/follow-list">
      <FollowListPage />
    </PageTransition>
  );
}
