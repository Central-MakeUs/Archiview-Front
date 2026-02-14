import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import type { IEditorInsightPlace } from '@/entities/editor/place/model/editorPlace.type';
import { parseMetric } from '@/features/editor/utils/parseMetric';

import type { PlaceOption } from './PlaceOptionTabs';
import { EditorPlaceItem } from '../../../entities/editor/place/ui/EditorPlaceItem';

function sortPlaces(places: IEditorInsightPlace[], metric: PlaceOption) {
  const copy = [...places];

  const getScore = (p: IEditorInsightPlace) => {
    switch (metric) {
      case 'MOST_VIEWED':
        return p.stats.viewCount;
      case 'MOST_SAVED':
        return p.stats.saveCount;
      case 'MOST_INSTAGRAM':
        return p.stats.instagramInflowCount;
      case 'MOST_DIRECTIONS':
        return p.stats.directionCount;
      case 'ALL':
      default:
        return 0;
    }
  };

  // ALL이면 원본 순서 유지
  if (metric === 'ALL') return copy;

  // 내림차순 정렬
  copy.sort((a, b) => getScore(b) - getScore(a));
  return copy;
}

interface IEditorPlaceItemListProps {
  places: IEditorInsightPlace[];
}

export const EditorPlaceItemList = ({ places }: IEditorPlaceItemListProps) => {
  const sp = useSearchParams();
  const metric = useMemo<PlaceOption>(() => parseMetric(sp?.get('metric') ?? ''), [sp]);

  const sortedPlaces = useMemo(() => sortPlaces(places, metric), [places, metric]);

  if (sortedPlaces.length === 0) return <div className="pt-6">장소가 없습니다.</div>;

  return (
    <div className="pt-6">
      {sortedPlaces.map((place) => (
        <Link href={`/editor/place-info/${place.placeId}`} key={place.placeId}>
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
                width={18}
                height={18}
                className="h-18 w-18 rounded-2xl"
              />
            }
          />
        </Link>
      ))}
    </div>
  );
};
