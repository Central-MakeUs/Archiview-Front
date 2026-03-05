import { Suspense } from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { SearchResultPage } from '@/pages/search-result';

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/archiver/search-result">
      <Suspense fallback={null}>
        <SearchResultPage />
      </Suspense>
    </PageTransition>
  );
}
