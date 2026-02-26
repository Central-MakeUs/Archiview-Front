'use client';

import { Chip } from '@/shared/ui/Chip';
import { XIcon } from '@/shared/ui/icon/XIcon';
import type { IHistory } from '@/entities/archiver/search/model/archiverSearch.type';

interface IRecentSearchSectionProps {
  histories: IHistory[];
  onDelete: (historyId: number) => void;
}

export const RecentSearchSection = ({ histories, onDelete }: IRecentSearchSectionProps) => {
  if (histories.length === 0) return null;

  return (
    <div className="flex flex-col gap-[20px] px-[20px]">
      <div className="body-18-bold">최근 검색어</div>
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
