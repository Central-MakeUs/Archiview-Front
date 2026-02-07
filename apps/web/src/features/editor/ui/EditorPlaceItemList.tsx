import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { useGetMyPlaceList } from '@/entities/editor/place/queries/useGetMyPlaceList';
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

export const EditorPlaceItemList = () => {
  const sp = useSearchParams();
  const metric = useMemo<PlaceOption>(() => parseMetric(sp?.get('metric') ?? ''), [sp]);

  const { data: placeData, isLoading, isError, error } = useGetMyPlaceList({ useMock: true });

  console.log(placeData);

  const places = placeData?.data?.places ?? [];

  const sortedPlaces = useMemo(() => sortPlaces(places, metric), [places, metric]);

  if (isLoading) return <div className="pt-6">로딩중...</div>;

  if (isError) return <div className="pt-6">에러: {String(error)}</div>;

  if (sortedPlaces.length === 0) return <div className="pt-6">장소가 없습니다.</div>;

  return (
    <div className="pt-6">
      {sortedPlaces.map((place) => (
        <EditorPlaceItem
          key={place.placeId}
          name={place.placeName}
          description={place.editorSummary}
          savedCount={place.stats.saveCount}
          viewCount={place.stats.viewCount}
          shareCount={place.stats.directionCount}
          instagramCount={place.stats.instagramInflowCount}
        />
      ))}
    </div>
  );
};
