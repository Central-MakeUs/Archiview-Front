'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { PopularPlaceSection } from '@/widgets/editor/PopularPlaceSection';
import { EditorTopBanner } from '@/widgets/editor/EditorTopBanner';
import { EditorInsight } from '@/features/editor/ui/EditorInsight';
import { useAuth } from '@/entities/auth/hooks/useAuth';
import { consumeRoleSwitchLoadingFlag } from '@/shared/constants/roleSwitchLoading';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { useEditorInsightSummaryQuery } from '@/entities/editor/place/queries/useGetInsightSummery';
import { useGetMyPlaceList } from '@/entities/editor/place/queries/useGetMyPlaceList';
import type { InsightPeriod } from '@/entities/editor/place/model/editorPlace.type';
import { useMinLoading } from '@/shared/hooks/useMinLoading';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';

function parseInsightPeriod(value: string | undefined): InsightPeriod {
  if (value === 'WEEK' || value === 'MONTH' || value === 'ALL') return value;
  return 'ALL';
}

const SKELETON_ROWS = [0, 1, 2, 3];

const EditorTopBannerSkeleton = () => (
  <div className="w-full rounded-b-4xl bg-primary-20 px-5 pb-6 pt-8">
    <div className="h-6 w-16 animate-pulse rounded-xl bg-neutral-10" />
    <div className="pt-3">
      <div className="h-8 w-2/5 animate-pulse rounded bg-neutral-10" />
      <div className="mt-2 h-6 w-3/5 animate-pulse rounded bg-neutral-10" />
      <div className="mt-4 h-4 w-2/5 animate-pulse rounded bg-neutral-10" />
    </div>
    <div className="mt-5 flex justify-end">
      <div className="h-4 w-28 animate-pulse rounded bg-neutral-10" />
    </div>
  </div>
);

const EditorInsightSkeleton = () => (
  <div className="px-5 py-8">
    <div className="flex items-center justify-between pb-4">
      <div className="h-7 w-20 animate-pulse rounded bg-neutral-20" />
      <div className="h-8 w-24 animate-pulse rounded bg-neutral-20" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={`editor-insight-skeleton-${index}`}
          className="rounded-default bg-primary-10 px-4 py-3"
        >
          <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-20" />
          <div className="mt-2 h-8 w-2/5 animate-pulse rounded bg-neutral-20" />
        </div>
      ))}
    </div>
  </div>
);

const PopularPlaceSectionSkeleton = () => (
  <>
    <div className="px-5 pb-4">
      <div className="h-8 w-full animate-pulse rounded-xl bg-neutral-20" />
    </div>
    <div className="px-5 pb-6">
      {SKELETON_ROWS.map((index) => (
        <div key={`editor-place-skeleton-${index}`} className="flex gap-3 py-3">
          <div className="h-18 w-18 shrink-0 animate-pulse rounded-2xl bg-neutral-20" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-5 w-2/3 animate-pulse rounded bg-neutral-20" />
            <div className="h-4 w-full animate-pulse rounded bg-neutral-20" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-20" />
          </div>
        </div>
      ))}
    </div>
  </>
);

const EditorHomeSkeleton = () => (
  <div className="w-full">
    <EditorTopBannerSkeleton />
    <EditorInsightSkeleton />
    <div className="pb-4 pl-5">
      <div className="h-7 w-36 animate-pulse rounded bg-neutral-20" />
    </div>
    <PopularPlaceSectionSkeleton />
  </div>
);

export const EditorHomePage = () => {
  useAuth();
  const [showRoleSwitchLoading, setShowRoleSwitchLoading] = useState(false);

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

  // const showLoading = useMinLoading(isLoading, 1500);

  useEffect(() => {
    setShowRoleSwitchLoading(consumeRoleSwitchLoadingFlag());
  }, []);

  // if (showRoleSwitchLoading && showLoading) {
  //   return <LoadingPage text="에디터 홈페이지를 로딩 중입니다" role="EDITOR" />;
  // }

  if (isError) return <ErrorPage />;

  if (isLoading) return <EditorHomeSkeleton />;

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
