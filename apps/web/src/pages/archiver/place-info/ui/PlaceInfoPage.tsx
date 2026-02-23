'use client';

import { BackButtonHeader } from '@/widgets/header';
import { useGetPlaceDetail } from '@/entities/archiver/place/queries/useGetPlaceDetail';

import { RoundedHeaderSection } from './RoundedHeader';
import { InfoSection } from './InfoSection';
import { CardSection } from './CardSection';
import { useMinLoading } from '@/shared/hooks/useMinLoading';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';

export const PlaceInfoPage = ({ placeId }: { placeId: number }) => {
  const {
    data: placeDetailData,
    isLoading,
    isError,
  } = useGetPlaceDetail({
    placeId,
    useMock: false,
  });

  const showLoading = useMinLoading(isLoading, 1500);
  if (showLoading) return <LoadingPage text="장소 정보를 불러오는 중입니다." role="ARCHIVER" />;
  if (isError) return <ErrorPage />;

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0">
        <BackButtonHeader title="" />
      </div>
      <div className="flex-1 overflow-auto scroll-none">
        <RoundedHeaderSection
          place={placeDetailData?.data?.place}
          thumbnail={placeDetailData?.data?.postPlaces[0].imageUrl || ''}
        />
        <InfoSection
          place={placeDetailData?.data?.place}
          recordNumber={placeDetailData?.data?.postPlaces.length}
        />
        <CardSection
          postPlaces={placeDetailData?.data?.postPlaces}
          placeName={placeDetailData?.data?.place.name}
          placeId={placeId}
        />
      </div>
    </div>
  );
};
