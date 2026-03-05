import { PlaceInfoPage, metadata } from '@/pages/archiver/place-info';
import { notFound } from 'next/navigation';
import React from 'react';

export { metadata };

export default function Page({ params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = React.use(params);
  const id = Number(placeId);

  return <PlaceInfoPage placeId={id} />;
}
