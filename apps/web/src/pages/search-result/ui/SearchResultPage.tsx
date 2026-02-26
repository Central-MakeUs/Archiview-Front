'use client';

import { useDeleteRecent } from '@/entities/archiver/search/mutation/useDeleteRecent';
import { useGetRecent } from '@/entities/archiver/search/queries/useGetRecent';
import { useGetRecommendations } from '@/entities/archiver/search/queries/useGetRecommendations';
import { useGetSearch } from '@/entities/archiver/search/queries/useGetSearch';
import { SearchBar } from '@/shared/ui/SearchBar';
import { TabBar } from '@/shared/ui/TabBar';
import { BackButtonHeader } from '@/widgets/header/BackButtonHeader';
import { archiverKeys } from '@/shared/lib/query-keys';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { RecentSearchSection } from './RecentSearchSection';
import { RecommendationSection } from './RecommendationSection';
import { InfoSection } from './InfoSection';
import { EditorSection } from './EditorSection';

interface ITabItem {
  label: string;
  value: 'all' | 'info' | 'editor';
}

const tabItems: ITabItem[] = [
  { label: '전체', value: 'all' },
  { label: '정보', value: 'info' },
  { label: '에디터', value: 'editor' },
];

export const SearchResultPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('search');
  const [tab, setTab] = useState(tabItems[0].value);
  const [searchText, setSearchText] = useState(search ?? '');
  const [searchTerm, setSearchTerm] = useState(search ?? '');

  const queryClient = useQueryClient();
  const { data: searchData } = useGetSearch({ search: searchTerm });
  const { data: recentData } = useGetRecent();
  const { data: recommendationsData } = useGetRecommendations();
  const { mutate: deleteRecent } = useDeleteRecent();

  return (
    <div className="bg-[#F5F6Fa] min-h-screen flex flex-col">
      <BackButtonHeader title="" />
      <div className="mb-[18px]">
        <TabBar items={tabItems} value={tab} onChange={(value) => setTab(value)} />
      </div>
      <div className="p-[20px]">
        <SearchBar
          value={searchText}
          onChange={(value) => setSearchText(value)}
          onSubmit={async () => {
            setSearchTerm(searchText);
            await queryClient.invalidateQueries({ queryKey: archiverKeys.getRecent.all.queryKey });
          }}
        />
      </div>
      <div className="flex flex-col pt-[20px] gap-[32px] flex-1 min-h-0 overflow-y-auto">
        {tab === 'all' && !searchTerm && (
          <>
            <RecentSearchSection
              histories={recentData?.data?.histories ?? []}
              onDelete={deleteRecent}
            />
            <RecommendationSection keywords={recommendationsData?.data?.keywords ?? []} />
          </>
        )}

        {tab === 'all' && searchTerm && searchData?.data && (
          <>
            {searchData.data.places.length === 0 && searchData.data.editors.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-[20px]">
                <p className="body-16-semibold text-neutral-40 text-center">검색 결과가 없습니다</p>
              </div>
            ) : (
              <>
                {searchData.data.places.length > 0 && (
                  <InfoSection
                    places={searchData.data.places}
                    hasMorePlaces={searchData.data.hasMorePlaces}
                    onMoreClick={() => setTab('info')}
                    showPreview
                  />
                )}
                {searchData.data.editors.length > 0 && (
                  <EditorSection
                    editors={searchData.data.editors}
                    hasMoreEditors={searchData.data.hasMoreEditors}
                    onMoreClick={() => setTab('editor')}
                    showPreview
                    searchTerm={searchTerm}
                  />
                )}
              </>
            )}
          </>
        )}

        {tab === 'info' && searchTerm && searchData?.data && searchData.data.places.length > 0 && (
          <InfoSection places={searchData.data.places} />
        )}

        {tab === 'editor' && searchTerm && searchData?.data && searchData.data.editors.length > 0 && (
          <EditorSection editors={searchData.data.editors} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
};
