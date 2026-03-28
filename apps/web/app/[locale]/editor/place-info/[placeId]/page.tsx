import { PageTransition } from '@/app/providers/PageTransition';
import { PlaceInfoPage, metadata } from '@/pages/editor/place-info';
import React, { Suspense } from 'react';

export { metadata };

export default function Page({
  params,
}: {
  params: Promise<{ placeId: string }>;
}): React.ReactElement {
  const { placeId } = React.use(params);
  const id = Number(placeId);

  return (
    <PageTransition id={`/editor/place-info/${placeId}`}>
      <Suspense fallback={null}>
        <PlaceInfoPage placeId={id} />
      </Suspense>
    </PageTransition>
  );
}
