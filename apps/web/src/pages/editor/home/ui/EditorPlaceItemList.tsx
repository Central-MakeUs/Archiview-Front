import { Item } from '@/shared/ui/common/Item';
import {
  FolderOutlineIcon,
  EyeIcon,
  PlaneArrowOutlineIcon,
  InstagramOutlineIcon,
  RightArrowIcon,
} from '@/shared/ui/icon';

import { EditorPlaceItem } from './EditorPlaceItem';

export const EditorPlaceItemList = () => {
  return (
    <div className="pt-6">
      <EditorPlaceItem
        name="가게 이름"
        description="가게설명가게설명가게설명가게설명가게설명"
        savedCount={12}
        viewCount={345}
        directionCount={67}
        instagramCount={8}
      />

      <EditorPlaceItem
        name="가게 이름"
        description="가게설명가게설명가게설명가게설명가게설명"
        savedCount={12}
        viewCount={345}
        directionCount={67}
        instagramCount={8}
      />

      <EditorPlaceItem
        name="가게 이름"
        description="가게설명가게설명가게설명가게설명가게설명"
        savedCount={12}
        viewCount={345}
        directionCount={67}
        instagramCount={8}
      />

      <EditorPlaceItem
        name="가게 이름"
        description="가게설명가게설명가게설명가게설명가게설명"
        savedCount={12}
        viewCount={345}
        directionCount={67}
        instagramCount={8}
      />
    </div>
  );
};
