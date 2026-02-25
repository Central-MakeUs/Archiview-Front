import { Suspense } from 'react';
import { SearchResultPage } from '@/pages/search-result';
import { LoadingAnimation } from '@/shared/ui/common/Loading/LoadingAnimation';

export default function Page(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <SearchResultPage />
    </Suspense>
  );
}
