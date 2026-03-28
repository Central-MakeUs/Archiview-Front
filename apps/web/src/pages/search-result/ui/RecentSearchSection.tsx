'use client';

import { useTranslations } from 'next-intl';
import { Chip } from '@/shared/ui/Chip';
import { XIcon } from '@/shared/ui/icon/XIcon';
import type { IHistory } from '@/entities/archiver/search/model/archiverSearch.type';

interface IRecentSearchSectionProps {
  histories: IHistory[];
  onDelete: (historyId: number) => void;
}

export const RecentSearchSection = ({ histories, onDelete }: IRecentSearchSectionProps) => {
  const t = useTranslations('archiverSearchResult');

  if (histories.length === 0) return null;

  return (
    <div className="flex flex-col gap-[20px] px-[20px]">
      <div className="body-18-bold">{t('recentTitle')}</div>
      <div className="flex flex-wrap gap-[4px]">
        {histories.map((item) => (
          <Chip
            key={item.historyId}
            label={item.keyword}
            chipType="keyword"
            endIcon={
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.historyId);
                }}
                className="inline-flex cursor-pointer"
              >
                <XIcon className="w-3 h-3" />
              </span>
            }
            className="border-none rounded-[12px] bg-primary-10 text-neutral-40"
          />
        ))}
      </div>
    </div>
  );
};
