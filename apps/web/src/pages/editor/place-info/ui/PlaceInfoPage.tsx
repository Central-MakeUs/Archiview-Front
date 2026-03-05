'use client';

import { BackButtonHeader } from '@/widgets/header';
import { RoundedHeaderSection } from './RoundedHeader';
import { InfoSection } from './InfoSection';
import { CardSection } from './CardSection';
import { useEditorGetPlaceInfo } from '@/entities/editor/place/mutations/useEditorGetPlaceInfo';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

const CARD_SKELETON_ITEMS = [0, 1, 2];

const PlaceInfoSkeleton = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0">
        <BackButtonHeader title="장소 통계 및 정보" />
      </div>
      <div className="flex-1 overflow-auto scroll-none">
        <section className="relative mb-[86px]">
          <div className="h-[196px] animate-pulse bg-neutral-20" />
          <div className="absolute -bottom-[86px] left-0 right-0 flex h-[125px] flex-col gap-6.5 rounded-t-[32px] border-b border-b-[#DBDCDF] bg-neutral-10 px-5 pb-5 pt-8">
            <div className="h-7 w-2/5 animate-pulse rounded bg-neutral-20" />
            <div className="h-5 w-full animate-pulse rounded bg-neutral-20" />
          </div>
        </section>

        <section className="flex flex-col gap-3 border-b border-b-[#DBDCDF] p-5">
          <div className="h-6 w-24 animate-pulse rounded bg-neutral-20" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-neutral-20" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-20" />
          <div className="h-5 w-full animate-pulse rounded bg-neutral-20" />
        </section>

        <section className="flex flex-col gap-4 p-5">
          {CARD_SKELETON_ITEMS.map((index) => (
            <div key={`place-info-card-skeleton-${index}`} className="flex min-h-31.75">
              <div className="w-20 shrink-0 animate-pulse rounded-l-default bg-neutral-20" />
              <div className="flex w-full flex-col gap-3 rounded-r-default bg-[#F7F7F8] px-3 py-3 pr-5">
                <div className="h-5 w-2/5 animate-pulse rounded bg-neutral-20" />
                <div className="h-4 w-full animate-pulse rounded bg-neutral-20" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-20" />
                <div className="flex gap-1 pt-1">
                  <div className="h-5 w-12 animate-pulse rounded-xl bg-neutral-20" />
                  <div className="h-5 w-16 animate-pulse rounded-xl bg-neutral-20" />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export const PlaceInfoPage = ({ placeId }: { placeId: number }) => {
  const { placeInfoData, isLoading, isError } = useEditorGetPlaceInfo(placeId);
  const showLoading = useMinLoading(isLoading);

  if (isError) return <ErrorPage />;

  if (showLoading || !placeInfoData) return <PlaceInfoSkeleton />;

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
