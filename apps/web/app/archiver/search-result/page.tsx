import { Suspense } from 'react';
import { SearchResultPage } from '@/pages/search-result';

export default function Page(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <SearchResultPage />
    </Suspense>
  );
}
