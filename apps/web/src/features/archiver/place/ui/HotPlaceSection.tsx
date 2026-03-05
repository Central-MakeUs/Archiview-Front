import { memo } from 'react';

import { HotPlaceCard } from '@/entities/archiver/place/ui/HotPlaceCard';
import { IHotPlace } from '@/entities/archiver/place/model/archiverPlace.type';

interface IHotPlaceSectionProps {
  hotPlaces: IHotPlace[];
  isLoading?: boolean;
}

const HotPlaceSectionComponent = ({
  hotPlaces,
  isLoading = false,
}: IHotPlaceSectionProps): React.ReactElement => {
  if (isLoading) {
    return (
      <section className="mb-5">
        <div className="flex justify-between mb-4 pl-2">
          <span className="heading-20-bold">요즘 HOT한 장소</span>
        </div>
        <div className="-mx-5 overflow-x-auto scroll-none momentum-scroll-x py-2 -my-2">
          <div className="flex gap-3 pl-5 pr-5">
            {[0, 1, 2].map((index) => (
              <div
                key={`hot-place-skeleton-${index}`}
                className="w-45 shrink-0 overflow-hidden rounded-default bg-white shadow-default"
              >
                <div className="h-[99px] animate-pulse bg-neutral-20" />
                <div className="flex flex-col gap-2 p-3">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-20" />
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-20" />
                  <div className="flex gap-1">
                    <div className="h-5 w-12 animate-pulse rounded-xl bg-neutral-20" />
                    <div className="h-5 w-14 animate-pulse rounded-xl bg-neutral-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (hotPlaces.length === 0) {
    return (
      <section className="mb-5">
        <div className="flex justify-between mb-4 pl-2">
          <span className="heading-20-bold">요즘 HOT한 장소</span>
        </div>
        <div>표시할 장소가 없습니다.</div>
      </section>
    );
  }

  return (
    <section className="mb-5">
      <div className="flex justify-between mb-4 pl-2">
        <span className="heading-20-bold">요즘 HOT한 장소</span>
      </div>
      <div className="-mx-5 overflow-x-auto scroll-none momentum-scroll-x py-2 -my-2">
        <div className="flex gap-3 pl-5 pr-5">
          {hotPlaces.map((place: IHotPlace) => (
            <HotPlaceCard
              key={place.placeId}
              placeId={place.placeId}
              imageUrl={place.imageUrl}
              name={place.name}
              address={place.address}
              categoryNames={place.categoryNames ?? []}
              hashTags={place.hashTags ?? []}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const HotPlaceSection = memo(HotPlaceSectionComponent);
HotPlaceSection.displayName = 'HotPlaceSection';
