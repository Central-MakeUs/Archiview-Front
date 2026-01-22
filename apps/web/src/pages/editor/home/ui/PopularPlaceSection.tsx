import { PlaceOptionTabs } from './PlaceOptionTabs';
import { EditorPlaceItemList } from './EditorPlaceItemList';

export const PopularPlaceSection = () => {
  return (
    <>
      <PlaceOptionTabs value="ALL" />
      <EditorPlaceItemList />
    </>
  );
};
