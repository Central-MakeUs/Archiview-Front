import { PageTransition } from '@/app/providers/PageTransition';
import { PlaceInfoPage, metadata } from '@/pages/archiver/place-info';
import { notFound } from 'next/navigation';
import React from 'react';

export { metadata };

export default function Page({ params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = React.use(params);
  const id = Number(placeId);

  return (
    <PageTransition id={`/archiver/place-info/${placeId}`}>
      <PlaceInfoPage placeId={id} />
    </PageTransition>
  );
}
