'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { PlaceOptionTabs, type PlaceOption } from '@/features/editor/ui/PlaceOptionTabs';
import { EditorPlaceItemList } from '@/features/editor/ui/EditorPlaceItemList';

function parseMetric(value: string | null): PlaceOption {
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

export const PopularPlaceSection = () => {
  const sp = useSearchParams();
  const metric = useMemo<PlaceOption>(() => parseMetric(sp?.get('metric') ?? ''), [sp]);

  return (
    <>
      <PlaceOptionTabs value={metric} />
      <EditorPlaceItemList />
    </>
  );
};
