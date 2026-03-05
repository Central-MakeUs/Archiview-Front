import { Suspense } from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { RegisterPlacePage, metadata } from '@/pages/editor/register-place';

export { metadata };

export default function RegisterPlaceRoute(): React.ReactNode {
  return (
    <PageTransition id="/editor/register-place">
      <Suspense fallback={null}>
        <RegisterPlacePage />
      </Suspense>
    </PageTransition>
  );
}
