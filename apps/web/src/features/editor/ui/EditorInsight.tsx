'use client';

import { useTranslations } from 'next-intl';

import { Kard } from '@/shared/ui/common/Kard';
import { PeriodDropdown } from '@/entities/editor/place/ui/PeriodDropDown';
import type { IEditorInsight, InsightPeriod } from '@/entities/editor/place/model/editorPlace.type';

interface IEditorInsightProps {
  insightData?: IEditorInsight;
  period: InsightPeriod;
}

export const EditorInsight = ({ insightData, period }: IEditorInsightProps) => {
  const t = useTranslations('editorHome');

  return (
    <div className="px-5 py-8">
      <div className="flex flex-row items-center justify-between pb-4">
        <p className="heading-20-bold">{t('insight.title')}</p>{' '}
        <PeriodDropdown value={period} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Kard className="border-none bg-primary-10 px-4 py-3">
          <p className="body-14-semibold pb-1 text-neutral-50">{t('insight.sharedPlaces')}</p>
          <p className="heading-28-semibold">{insightData?.totalPlaceCount}</p>
        </Kard>
        <Kard className="border-none bg-primary-10 px-4 py-3">
          <p className="body-14-semibold pb-1 text-neutral-50">{t('insight.instagram')}</p>
          <p className="heading-28-semibold">{insightData?.instagramInflowCount}</p>
        </Kard>
        <Kard className="border-none bg-primary-10 px-4 py-3">
          <p className="body-14-semibold pb-1 text-neutral-50">{t('insight.saves')}</p>
          <p className="heading-28-semibold">{insightData?.saveCount}</p>
        </Kard>
        <Kard className="border-none bg-primary-10 px-4 py-3">
          <p className="body-14-semibold pb-1 text-neutral-50">{t('insight.views')}</p>
          <p className="heading-28-semibold">{insightData?.viewCount}</p>
        </Kard>
      </div>
    </div>
  );
};
