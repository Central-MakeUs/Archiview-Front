'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CaretRightIcon, FolderOutlineIcon, RightArrowIcon, EyeIcon } from '@/shared/ui/icon';
import type { IPlace } from '@/entities/archiver/search/model/archiverSearch.type';

const MAX_PREVIEW_ITEMS = 3;

interface IInfoSectionProps {
  places: IPlace[];
  hasMorePlaces?: boolean;
  onMoreClick?: () => void;
  showPreview?: boolean;
}

export const InfoSection = ({
  places,
  hasMorePlaces = false,
  onMoreClick,
  showPreview = false,
}: IInfoSectionProps) => {
  const router = useRouter();
  const displayPlaces = showPreview ? places.slice(0, MAX_PREVIEW_ITEMS) : places;

  return (
    <div className="flex flex-col gap-[20px] w-full">
      <span className="body-18-bold px-[20px]">정보</span>
      <div className="flex flex-col gap-[6px] w-full">
        <div className="flex flex-col w-full bg-transparent">
          {displayPlaces.map((place) => (
            <div
              key={place.placeId}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/archiver/place-info/${place.placeId}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/archiver/place-info/${place.placeId}`);
                }
              }}
              className="flex w-full items-center p-5 cursor-pointer bg-transparent border-b border-primary-10"
            >
              <div className="shrink-0">
                <div className="relative h-18 w-18 overflow-hidden rounded-2xl bg-neutral-20">
                  <Image src={place.imageUrl} alt={place.placeName} fill className="object-cover" />
                </div>
              </div>
              <div className="flex flex-col pl-2 min-w-0 flex-1 overflow-hidden">
                <p className="body-16-semibold flex flex-row items-center justify-between gap-2">
                  <span className="truncate min-w-0">{place.placeName}</span>
                  <RightArrowIcon className="shrink-0" />
                </p>
                <p className="body-14-semibold text-neutral-50 truncate pt-0.75">{place.summary}</p>
                <div className="flex flex-row gap-2 caption-12-regular text-primary-50 pt-1">
                  <p className="flex flex-row items-center gap-1">
                    <FolderOutlineIcon className="w-4 text-primary-30" />
                    {place.saveCount}
                  </p>
                  <p className="flex flex-row items-center gap-1">
                    <EyeIcon className="w-4 text-primary-30" />
                    {place.viewCount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showPreview && onMoreClick && places.length > 3 && (
          <div className="flex justify-end px-[20px]">
            <button
              type="button"
              onClick={onMoreClick}
              className="flex items-center gap-1 body-14-semibold text-primary-40 underline"
            >
              장소 더 보기
              <CaretRightIcon className="w-4 h-4 [&_path]:stroke-[var(--color-primary-40)]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
