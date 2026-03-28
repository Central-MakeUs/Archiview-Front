import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageTransition } from '@/app/providers/PageTransition';
import { PlaceInfoPage } from '@/pages/archiver/place-info';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('archiverPlaceInfo');
  return { title: t('metadata.title') };
}

export default function Page({ params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = React.use(params);
  const id = Number(placeId);

  return (
    <PageTransition id={`/archiver/place-info/${placeId}`}>
      <PlaceInfoPage placeId={id} />
    </PageTransition>
  );
}
