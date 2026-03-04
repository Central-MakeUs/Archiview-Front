import { Suspense } from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { ArchiverHomePage, metadata } from '@/pages/archiver/home';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/archiver/home">
      <Suspense fallback={null}>
        <ArchiverHomePage />
      </Suspense>
    </PageTransition>
  );
}
