'use client';

import { BackButtonHeader } from '@/widgets/header';
import { useGetPlaceDetail } from '@/entities/archiver/place/queries/useGetPlaceDetail';

import { RoundedHeaderSection } from './RoundedHeader';
import { InfoSection } from './InfoSection';
import { CardSection } from './CardSection';
import { useEditorGetPlaceInfo } from '@/entities/editor/place/mutations/useEditorGetPlaceInfo';

export const PlaceInfoPage = ({ placeId }: { placeId: number }) => {
  const { placeInfoData } = useEditorGetPlaceInfo(placeId);
  console.log(placeInfoData);

  if (!placeInfoData?.data) return <div>에러</div>;

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto scroll-none">
        <BackButtonHeader title="장소 통계 및 정보" />
        <RoundedHeaderSection
          place={placeInfoData.data || undefined}
          thumbnail={placeInfoData.data?.placeImageUrl || ''}
        />
        <InfoSection
          place={placeInfoData?.data}
          recordNumber={placeInfoData?.data?.postPlaces.length}
        />
        <CardSection
          postPlaces={placeInfoData?.data?.postPlaces}
          placeName={placeInfoData?.data?.placeName}
          placeId={placeId}
        />
      </div>
      <div className="shrink-0"></div>
    </div>
  );
};
