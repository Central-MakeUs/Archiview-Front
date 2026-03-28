import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageTransition } from '@/app/providers/PageTransition';
import { ArchiverCategoryPage } from '@/pages/archiver/category';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('archiverCategoryPage');
  return { title: t('metadata.title') };
}

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/archiver/category">
      <Suspense fallback={null}>
        <ArchiverCategoryPage />
      </Suspense>
    </PageTransition>
  );
}
