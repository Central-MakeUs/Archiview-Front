import { Suspense } from 'react';
import { SsgoiTransition } from '@ssgoi/react';
import { SearchResultPage } from '@/pages/search-result';

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/archiver/search-result">
      <Suspense fallback={null}>
        <SearchResultPage />
      </Suspense>
    </SsgoiTransition>
  );
}
