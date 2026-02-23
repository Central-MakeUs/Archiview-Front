import React from 'react';
import Image from 'next/image';

import { Item } from '@/shared/ui/common/Item';
import { RightArrowIcon, FolderOutlineIcon, EyeIcon } from '@/shared/ui/icon';

interface IArchiverPlaceItemProps {
  name: string;
  description: string;
  savedCount: number;
  viewCount: number;
  onClick?: () => void;
  thumbnail: string;
}

export const ArchiverPlaceItem = ({
  name,
  description,
  savedCount,
  viewCount,
  onClick,
  thumbnail,
}: IArchiverPlaceItemProps): React.ReactElement => {
  return (
    <Item
      thumbnail={
        <div className="relative h-18 w-18 overflow-hidden rounded-2xl bg-neutral-30">
          <Image
            src={thumbnail}
            alt={name}
            fill
            sizes="72px"
            unoptimized
            className="object-cover"
          />
        </div>
      }
      onClick={onClick}
    >
      <div className="flex flex-col pl-2 min-w-0">
        <p className="body-16-semibold text-primary-40 flex flex-row items-center justify-between">
          <span className="truncate">{name}</span>
          <RightArrowIcon />
        </p>

        <p className="body-14-semibold text-neutral-50 w-53 truncate pt-0.75">{description}</p>

        <div className="flex flex-row gap-2 caption-12-regular text-primary-50 pt-1">
          <p className="flex flex-row items-center gap-1">
            <FolderOutlineIcon className="w-4 text-primary-30" />
            {savedCount}
          </p>
          <p className="flex flex-row items-center gap-1">
            <EyeIcon className="w-4 text-primary-30" />
            {viewCount}
          </p>
        </div>
      </div>
    </Item>
  );
};
