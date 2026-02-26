'use client';

import { BackButtonHeader } from '@/widgets/header';
import { RoundedHeaderSection } from './RoundedHeader';
import { InfoSection } from './InfoSection';
import { CardSection } from './CardSection';
import { useEditorGetPlaceInfo } from '@/entities/editor/place/mutations/useEditorGetPlaceInfo';
import { useMinLoading } from '@/shared/hooks/useMinLoading';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';

export const PlaceInfoPage = ({ placeId }: { placeId: number }) => {
  const { placeInfoData, isLoading, isError } = useEditorGetPlaceInfo(placeId);
  const showLoading = useMinLoading(isLoading, 1500);
  if (showLoading)
    return (
      <div>
        <LoadingPage text="장소 정보를 불러오는 중입니다." role="EDITOR" />
      </div>
    );

  if (isError) return <ErrorPage />;

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0">
        <BackButtonHeader title="장소 통계 및 정보" />
      </div>
      <div className="flex-1 overflow-auto scroll-none">
        <RoundedHeaderSection
          place={placeInfoData?.data || undefined}
          thumbnail={placeInfoData?.data?.placeImageUrl || ''}
        />
        <InfoSection
          place={placeInfoData?.data || undefined}
          recordNumber={placeInfoData?.data?.postPlaces.length}
        />
        <CardSection
          postPlaces={placeInfoData?.data?.postPlaces}
          placeName={placeInfoData?.data?.placeName}
          placeId={placeId}
        />
      </div>
    </div>
  );
};
