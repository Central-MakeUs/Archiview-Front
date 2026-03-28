import { Suspense } from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { TermAgreePage, metadata } from '@/pages/term-agree';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/term-agree">
      <Suspense fallback={null}>
        <TermAgreePage />
      </Suspense>
    </PageTransition>
  );
}
