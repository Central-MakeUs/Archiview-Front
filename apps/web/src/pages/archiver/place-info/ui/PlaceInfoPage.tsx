'use client';

import { useSearchParams } from 'next/navigation';
import { BackButtonHeader } from '@/widgets/header';
import { useGetPlaceDetail } from '@/entities/archiver/place/queries/useGetPlaceDetail';
import { useGetEditorPlace } from '@/entities/archiver/place/queries/useGetEditorPlace';

import { RoundedHeaderSection } from './RoundedHeader';
import { InfoSection } from './InfoSection';
import { CardSection } from './CardSection';
import { useMinLoading } from '@/shared/hooks/useMinLoading';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';

export const PlaceInfoPage = ({ placeId }: { placeId: number }) => {
  const searchParams = useSearchParams();
  const editorId = searchParams?.get('editor') ?? null;

  const {
    data: placeDetailData,
    isLoading,
    isError,
  } = useGetPlaceDetail({
    placeId,
    useMock: false,
    enabled: !editorId,
  });

  const {
    data: editorPlaceData,
    isLoading: isEditorPlaceLoading,
    isError: isEditorPlaceError,
  } = useGetEditorPlace({
    userId: editorId ?? '',
    placeId,
    useMock: false,
    enabled: !!editorId,
  });

  const placeData = editorId ? editorPlaceData : placeDetailData;
  const showLoading = useMinLoading(
    editorId ? isEditorPlaceLoading : isLoading,
    1500,
  );
  const showError = editorId ? isEditorPlaceError : isError;

  if (showLoading) return <LoadingPage text="장소 정보를 불러오는 중입니다." role="ARCHIVER" />;
  if (showError) return <ErrorPage />;

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0">
        <BackButtonHeader title="" />
      </div>
      <div className="flex-1 overflow-auto scroll-none">
        <RoundedHeaderSection
          place={placeData?.data?.place}
          thumbnail={placeData?.data?.postPlaces?.[0]?.imageUrl || ''}
        />
        <InfoSection
          place={placeData?.data?.place}
          recordNumber={placeData?.data?.postPlaces?.length ?? 0}
        />
        <CardSection
          postPlaces={placeData?.data?.postPlaces ?? []}
          placeName={placeData?.data?.place?.name ?? ''}
          placeId={placeId}
        />
      </div>
    </div>
  );
};
