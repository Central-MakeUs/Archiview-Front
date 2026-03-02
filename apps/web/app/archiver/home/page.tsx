import { Suspense } from 'react';
import { SsgoiTransition } from '@ssgoi/react';

import { ArchiverHomePage, metadata } from '@/pages/archiver/home';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/archiver/home">
      <Suspense fallback={null}>
        <ArchiverHomePage />
      </Suspense>
    </SsgoiTransition>
  );
}
