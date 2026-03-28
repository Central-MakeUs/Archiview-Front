import { Suspense } from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { ArchiverCategoryPage } from '@/pages/archiver/category';

export { metadata } from '@/pages/archiver/category';

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/archiver/category">
      <Suspense fallback={null}>
        <ArchiverCategoryPage />
      </Suspense>
    </PageTransition>
  );
}
