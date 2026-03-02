import { Suspense } from 'react';
import { SsgoiTransition } from '@ssgoi/react';
import { RegisterPlacePage, metadata } from '@/pages/editor/register-place';

export { metadata };

export default function RegisterPlaceRoute(): React.ReactNode {
  return (
    <SsgoiTransition id="/editor/register-place">
      <Suspense fallback={null}>
        <RegisterPlacePage />
      </Suspense>
    </SsgoiTransition>
  );
}
