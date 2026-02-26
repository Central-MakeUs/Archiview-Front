'use client';

import { Chip } from '@/shared/ui/Chip';
import type { IKeyword } from '@/entities/archiver/search/model/archiverSearch.type';

interface IRecommendationSectionProps {
  keywords: IKeyword[];
}

export const RecommendationSection = ({ keywords }: IRecommendationSectionProps) => {
  return (
    <div className="flex flex-col gap-[20px] px-[20px]">
      <div className="body-18-bold">추천 키워드</div>
      <div className="flex flex-wrap gap-x-[4px] gap-y-[8px]">
        {keywords.map((keyword, index) => (
          <Chip
            key={index}
            label={keyword.keyword}
            chipType="keyword"
            className="border-none rounded-[12px]"
          />
        ))}
      </div>
    </div>
  );
};
