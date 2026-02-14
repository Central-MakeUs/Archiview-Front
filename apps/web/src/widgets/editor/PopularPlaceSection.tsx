'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { PlaceOptionTabs, type PlaceOption } from '@/features/editor/ui/PlaceOptionTabs';
import { EditorPlaceItemList } from '@/features/editor/ui/EditorPlaceItemList';
import type { IEditorInsightPlace } from '@/entities/editor/place/model/editorPlace.type';

function parseMetric(value: string | undefined): PlaceOption {
  switch (value) {
    case 'MOST_VIEWED':
    case 'MOST_SAVED':
    case 'MOST_INSTAGRAM':
    case 'MOST_DIRECTIONS':
    case 'ALL':
      return value;
    default:
      return 'ALL';
  }
}

interface IPopularPlaceSectionProps {
  places: IEditorInsightPlace[];
}

export const PopularPlaceSection = ({ places }: IPopularPlaceSectionProps) => {
  const sp = useSearchParams();
  const metric = useMemo<PlaceOption>(() => parseMetric(sp?.get('metric') ?? undefined), [sp]);

  return (
    <>
      <PlaceOptionTabs value={metric} />
      <EditorPlaceItemList places={places} />
    </>
  );
};
