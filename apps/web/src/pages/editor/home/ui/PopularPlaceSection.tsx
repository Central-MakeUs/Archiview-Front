import { PlaceOptionTabs } from '@/features/editor/ui/PlaceOptionTabs';
import { EditorPlaceItemList } from './EditorPlaceItemList';
import { IEditorHomeResponseDTO } from '@/entities/editor/home/model/editorHome.type';

export const PopularPlaceSection = ({
  editorInsightData,
}: {
  editorInsightData?: IEditorHomeResponseDTO;
}) => {
  return (
    <>
      <PlaceOptionTabs value="ALL" />
      <EditorPlaceItemList editorInsightData={editorInsightData} />
    </>
  );
};
