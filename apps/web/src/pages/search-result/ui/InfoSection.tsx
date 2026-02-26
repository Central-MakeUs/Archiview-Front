'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CaretRightIcon, FolderOutlineIcon, RightArrowIcon, EyeIcon } from '@/shared/ui/icon';
import { Item } from '@/shared/ui/common/Item';
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
    <div className="flex flex-col gap-[20px] px-[20px]">
      <span className="body-18-bold">정보</span>
      <div className="flex flex-col gap-[6px]">
        <div className="flex flex-col rounded-2xl overflow-hidden bg-white">
          {displayPlaces.map((place) => (
          <Item
            key={place.placeId}
            thumbnail={
              <div className="relative h-18 w-18 overflow-hidden rounded-2xl bg-neutral-30 shrink-0">
                <Image src={place.imageUrl} alt={place.placeName} fill className="object-cover" />
              </div>
            }
            onClick={() => router.push(`/archiver/place-info/${place.placeId}`)}
          >
            <div className="flex flex-col pl-2 min-w-0">
              <p className="body-16-semibold flex flex-row items-center justify-between">
                <span className="truncate">{place.placeName}</span>
                <RightArrowIcon />
              </p>
              <p className="body-14-semibold text-neutral-50 w-53 truncate pt-0.75">
                {place.summary}
              </p>
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
          </Item>
          ))}
        </div>
        {showPreview && onMoreClick && places.length >= 1 && (
          <div className="flex justify-end">
          <button
            type="button"
            onClick={onMoreClick}
            className="flex items-center gap-1 body-14-semibold text-primary-40 underline"
          >
            장소 더보기
            <CaretRightIcon className="w-4 h-4 [&_path]:stroke-[var(--color-primary-40)]" />
          </button>
          </div>
        )}
      </div>
    </div>
  );
};
