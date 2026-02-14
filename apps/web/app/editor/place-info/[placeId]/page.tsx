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
    <Suspense fallback={<div>로딩중...</div>}>
      <PlaceInfoPage placeId={id} />
    </Suspense>
  );
}
