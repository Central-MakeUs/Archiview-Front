import { Suspense } from 'react';

import { ArchiverCategoryPage } from '@/pages/archiver/category';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';

export { metadata } from '@/pages/archiver/category';

export default function Page(): React.ReactElement {
  return (
    <Suspense fallback={<LoadingPage text="장소 목록을 불러오는 중입니다." role="ARCHIVER" />}>
      <ArchiverCategoryPage />
    </Suspense>
  );
}
