import { Suspense } from 'react';

import { ArchiverHomePage, metadata } from '@/pages/archiver/home';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <ArchiverHomePage />
    </Suspense>
  );
}
