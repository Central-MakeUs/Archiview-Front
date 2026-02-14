import { Suspense } from 'react';

import { TermAgreePage, metadata } from '@/pages/term-agree';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <TermAgreePage />
    </Suspense>
  );
}
