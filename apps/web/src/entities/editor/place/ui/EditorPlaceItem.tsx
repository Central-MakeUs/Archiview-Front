import React from 'react';

import { Item } from '@/shared/ui/common/Item';
import {
  RightArrowIcon,
  FolderOutlineIcon,
  EyeIcon,
  PlaneArrowOutlineIcon,
  InstagramOutlineIcon,
} from '@/shared/ui/icon';

interface IEditorPlaceItemProps {
  name: string;
  description: string;
  savedCount: number;
  viewCount: number;
  shareCount: number;
  instagramCount: number;
  thumbnail?: React.ReactNode;
}

export const EditorPlaceItem = ({
  name,
  description,
  savedCount,
  viewCount,
  shareCount,
  instagramCount,
  thumbnail = <div className="h-18 w-18 rounded-2xl bg-neutral-30" />,
}: IEditorPlaceItemProps): React.ReactElement => {
  return (
    <Item thumbnail={thumbnail}>
      <div className="flex flex-col pl-2 min-w-0">
        <p className="body-16-semibold flex flex-row items-center justify-between">
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
          <p className="flex flex-row items-center gap-1">
            <PlaneArrowOutlineIcon className="w-4 text-primary-30" />
            {shareCount}
          </p>
          <p className="flex flex-row items-center gap-1">
            <InstagramOutlineIcon className="w-4 text-primary-30" />
            {instagramCount}
          </p>
        </div>
      </div>
    </Item>
  );
};
