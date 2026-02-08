import { Suspense } from 'react';
import { RegisterPlacePage, metadata } from '@/pages/editor/register-place';

export { metadata };

export default function RegisterPlaceRoute(): React.ReactNode {
  return (
    <Suspense fallback={null}>
      <RegisterPlacePage />
    </Suspense>
  );
}
