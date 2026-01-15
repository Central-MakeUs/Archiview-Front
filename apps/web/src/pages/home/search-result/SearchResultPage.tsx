'use client';
import { Chip } from '@/shared/ui/Chip';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { SearchBar } from '@/shared/ui/SearchBar';
import { TabBar } from '@/shared/ui/TabBar';
import { BackButtonHeader } from '@/widgets/header/BackButtonHeader';
import { useState } from 'react';

interface ITabItem {
  label: string;
  value: 'all' | 'info' | 'editor';
}

const tabItems: ITabItem[] = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '정보',
    value: 'info',
  },
  {
    label: '에디터',
    value: 'editor',
  },
];

export const SearchResultPage = () => {
  const [tab, setTab] = useState(tabItems[0].value);
  const [searchText, setSearchText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  return (
    <div>
      <BackButtonHeader title="" />
      <div className="mb-[18px]">
        <TabBar items={tabItems} value={tab} onChange={(value) => setTab(value)} />
      </div>
      <div className="p-[20px]">
        <SearchBar
          value={searchText}
          onChange={(value) => setSearchText(value)}
          onSubmit={() => {
            setSearchTerm(searchText);
            setSearchText('');
          }}
        />
      </div>
      <div className="flex flex-col pt-[20px] gap-[32px]">
        <div className="flex flex-col gap-[20px] px-[20px]">
          <div className="body-18-bold">최근 검색어</div>
          <div className="flex flex-wrap gap-[4px]">
            {Array.from({ length: 8 }).map((value, index) => (
              <Chip
                key={index}
                label="텍스트"
                chipType="keyword"
                endIcon={<XIcon className="w-[9px] h-[9px]" />}
                selected={index === selectedChip}
                onClick={() => setSelectedChip(index)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[20px] px-[20px] ">
          <div className="body-18-bold">추천 키워드</div>
          <div className="flex flex-wrap gap-x-[4px] gap-y-[8px]">
            {Array.from({ length: 8 }).map((value, index) => (
              <Chip key={index} label="# 텍스트" chipType="keyword" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
