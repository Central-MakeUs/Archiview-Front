import { IEditorHomeResponseDTO } from '@/entities/editor/home/model/editorHome.type';
import { EditorPlaceItem } from './EditorPlaceItem';
import Link from 'next/link';

export const EditorPlaceItemList = ({
  editorInsightData,
}: {
  editorInsightData?: IEditorHomeResponseDTO;
}) => {
  return (
    <div className="pt-6">
      {editorInsightData?.data?.places.map((place) => (
        //TODO: 상세페이지 조회 API 나오면 상세페이지로 route 변경 및 데이터 연결
        <Link href={`/editor/register-place?placeId=${place.placeId}`} key={place.placeId}>
          <EditorPlaceItem
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
