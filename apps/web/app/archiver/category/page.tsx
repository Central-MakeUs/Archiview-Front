import { Suspense } from 'react';
import { SsgoiTransition } from '@ssgoi/react';

import { ArchiverCategoryPage } from '@/pages/archiver/category';

export { metadata } from '@/pages/archiver/category';

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/archiver/category">
      <Suspense fallback={null}>
        <ArchiverCategoryPage />
      </Suspense>
    </SsgoiTransition>
  );
}
