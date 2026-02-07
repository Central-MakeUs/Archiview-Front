'use client';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Card } from '@/shared/ui/common/Card';

import { useEditorInsightSummaryQuery } from '@/entities/editor/place/queries/useGetInsightSummery';
import type { InsightPeriod } from '@/entities/editor/place/model/editorPlace.type';
import { PeriodDropdown } from '@/entities/editor/place/ui/PeriodDropDown';


function parseInsightPeriod(value: string | null): InsightPeriod {
  if (value === 'WEEK' || value === 'MONTH' || value === 'ALL') return value;
  return 'ALL';
}

export const EditorInsight = () => {
  const sp = useSearchParams();

  const period = useMemo<InsightPeriod>(() => parseInsightPeriod(sp?.get('period') ?? 'ALL'), [sp]);

  const {
    data: insightData,
    isLoading,
    isError,
  } = useEditorInsightSummaryQuery({ period, useMock: true });

  // TODO : 이 둘 예쁘게 처리하기
  if (isLoading) return <div>로딩중입니다</div>;

  if (isError) return <div>에러입니다 ㅜ</div>;

  return (
    <div className="px-5 py-8">
      <div className="flex flex-row justify-between items-center pb-4">
        <p className="heading-20-bold">인사이트</p> <PeriodDropdown value="ALL" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-primary-10 border-none px-4 py-3">
          <p className="pb-1 body-14-semibold text-neutral-50">공유한 장소</p>
          <p className="heading-28-semibold">{insightData?.data?.totalPlaceCount}</p>
        </Card>
        <Card className="bg-primary-10 border-none px-4 py-3">
          <p className="pb-1 body-14-semibold text-neutral-50">인스타 유입</p>
          <p className="heading-28-semibold">{insightData?.data?.instagramInflowCount}</p>
        </Card>
        <Card className="bg-primary-10 border-none px-4 py-3">
          <p className="pb-1 body-14-semibold text-neutral-50">저장 수</p>
          <p className="heading-28-semibold">{insightData?.data?.saveCount}</p>
        </Card>
        <Card className="bg-primary-10 border-none px-4 py-3">
          <p className="pb-1 body-14-semibold text-neutral-50">조회 수</p>
          <p className="heading-28-semibold">{insightData?.data?.viewCount}</p>
        </Card>
      </div>
    </div>
  );
};
