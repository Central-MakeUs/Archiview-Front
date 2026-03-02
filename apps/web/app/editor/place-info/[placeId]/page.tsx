import { PlaceInfoPage, metadata } from '@/pages/editor/place-info';
import { SsgoiTransition } from '@ssgoi/react';
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
    <SsgoiTransition id={`/editor/place-info/${placeId}`}>
      <Suspense fallback={null}>
        <PlaceInfoPage placeId={id} />
      </Suspense>
    </SsgoiTransition>
  );
}
