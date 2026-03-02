import { Suspense } from 'react';
import { SsgoiTransition } from '@ssgoi/react';

import { TermAgreePage, metadata } from '@/pages/term-agree';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/term-agree">
      <Suspense fallback={null}>
        <TermAgreePage />
      </Suspense>
    </SsgoiTransition>
  );
}
