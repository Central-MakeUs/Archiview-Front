import { PlaceInfoPage, metadata } from '@/pages/editor/place-info';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
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
    <Suspense fallback={<LoadingPage text="장소 정보를 불러오는 중입니다." role="EDITOR" />}>
      <PlaceInfoPage placeId={id} />
    </Suspense>
  );
}
