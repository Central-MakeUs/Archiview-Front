import { PlaceInfoPage, metadata } from '@/pages/archiver/place-info';
import { SsgoiTransition } from '@ssgoi/react';
import React from 'react';

export { metadata };

export default function Page({ params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = React.use(params);
  const id = Number(placeId);

  return (
    <SsgoiTransition id={`/archiver/place-info/${placeId}`}>
      <PlaceInfoPage placeId={id} />
    </SsgoiTransition>
  );
}
