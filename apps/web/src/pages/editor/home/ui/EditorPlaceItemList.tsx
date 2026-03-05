import { IEditorHomeResponseDTO } from '@/entities/editor/home/model/editorHome.type';
import { EditorPlaceItem } from '@/entities/editor/place/ui/EditorPlaceItem';
import Link from 'next/link';

export const EditorPlaceItemList = ({
  editorInsightData,
}: {
  editorInsightData?: IEditorHomeResponseDTO;
}) => {
  return (
    <div className="pt-6">
      {editorInsightData?.data?.places.map((place) => (
        <Link href={`/editor/register-place?placeId=${place.placeId}`} key={place.placeId}>
          <EditorPlaceItem
            placeId={place.placeId}
            name={place.placeName}
            description={place.editorSummary}
            savedCount={place.stats.saveCount}
            viewCount={place.stats.viewCount}
            shareCount={place.stats.directionCount}
            instagramCount={place.stats.instagramInflowCount}
            thumbnail={
              <img
                src={place.placeImageUrl}
                alt={place.placeName}
                width={100}
                height={100}
                className="h-18 w-18 rounded-2xl bg-neutral-30"
              />
            }
          />
        </Link>
      ))}
    </div>
  );
};
