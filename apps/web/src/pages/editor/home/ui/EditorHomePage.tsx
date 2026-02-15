'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { PopularPlaceSection } from '@/widgets/editor/PopularPlaceSection';
import { EditorTopBanner } from '@/widgets/editor/EditorTopBanner';
import { EditorInsight } from '@/features/editor/ui/EditorInsight';
import { useAuth } from '@/entities/auth/hooks/useAuth';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { useEditorInsightSummaryQuery } from '@/entities/editor/place/queries/useGetInsightSummery';
import { useGetMyPlaceList } from '@/entities/editor/place/queries/useGetMyPlaceList';
import type { InsightPeriod } from '@/entities/editor/place/model/editorPlace.type';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

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

  const {
    data: insightData,
    isLoading: isInsightLoading,
    isError: isInsightError,
  } = useEditorInsightSummaryQuery({ period, useMock: false });

  const {
    data: placeData,
    isLoading: isPlaceLoading,
    isError: isPlaceError,
  } = useGetMyPlaceList({ useMock: false });

  const isLoading = isInsightLoading || isPlaceLoading;
  const isError = isInsightError || isPlaceError;

  const showLoading = useMinLoading(isLoading, 1500);
  if (showLoading) return <LoadingPage text="에디터 홈페이지를 로딩 중입니다" role="EDITOR" />;

  if (isError)
    return <div className="flex h-screen items-center justify-center">에러가 발생했습니다</div>;

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
