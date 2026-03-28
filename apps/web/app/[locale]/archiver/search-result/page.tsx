import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageTransition } from '@/app/providers/PageTransition';
import { SearchResultPage } from '@/pages/search-result';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('archiverSearchResult');
  return { title: t('metadata.title') };
}

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/archiver/search-result">
      <Suspense fallback={null}>
        <SearchResultPage />
      </Suspense>
    </PageTransition>
  );
}
