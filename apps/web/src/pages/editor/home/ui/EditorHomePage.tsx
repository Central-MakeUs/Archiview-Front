'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { PopularPlaceSection } from '@/widgets/editor/PopularPlaceSection';
import { EditorTopBanner } from '@/widgets/editor/EditorTopBanner';
import { EditorInsight } from '@/features/editor/ui/EditorInsight';
import { useAuth } from '@/entities/auth/hooks/useAuth';
import { useEditorInsightSummaryQuery } from '@/entities/editor/place/queries/useGetInsightSummery';
import { useGetMyPlaceList } from '@/entities/editor/place/queries/useGetMyPlaceList';
import type { InsightPeriod } from '@/entities/editor/place/model/editorPlace.type';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';

function parseInsightPeriod(value: string | undefined): InsightPeriod {
  if (value === 'WEEK' || value === 'MONTH' || value === 'ALL') return value;
  return 'ALL';
}

export const EditorHomePage = () => {
  useAuth();

  const sp = useSearchParams();
  const period = useMemo<InsightPeriod>(
    () => parseInsightPeriod(sp?.get('period') ?? undefined),
    [sp],
  );

  const { data: insightData, isError: isInsightError } = useEditorInsightSummaryQuery({
    period,
    useMock: false,
  });

  const { data: placeData, isError: isPlaceError } = useGetMyPlaceList({ useMock: false });

  const isError = isInsightError || isPlaceError;

  if (isError) return <ErrorPage />;

  const places = placeData?.data?.places ?? [];

  return (
    <div className="w-full">
      <EditorTopBanner
        editorNickname={insightData?.data?.editorNickname ?? ''}
        placeCount={places.length}
      />
      <EditorInsight insightData={insightData?.data ?? undefined} />
      <p className="heading-20-bold pb-4 pl-5">반응이 좋은 장소</p>
      <PopularPlaceSection places={places} />
    </div>
  );
};
