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
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { RecentSearchSection } from './RecentSearchSection';
import { RecommendationSection } from './RecommendationSection';
import { InfoSection } from './InfoSection';
import { EditorSection } from './EditorSection';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';
import { Loading } from '@/shared/ui/common/Loading/Loading';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

interface ITabItem {
  label: string;
  value: 'all' | 'info' | 'editor';
}

export const SearchResultPage = () => {
  const t = useTranslations('archiverSearchResult');
  const tabItems = useMemo<ITabItem[]>(
    () => [
      { label: t('tabs.all'), value: 'all' },
      { label: t('tabs.info'), value: 'info' },
      { label: t('tabs.editor'), value: 'editor' },
    ],
    [t],
  );

  const searchParams = useSearchParams();
  const search = searchParams?.get('search');
  const [tab, setTab] = useState<ITabItem['value']>('all');
  const [searchText, setSearchText] = useState(search ?? '');
  const [searchTerm, setSearchTerm] = useState(search ?? '');

  const queryClient = useQueryClient();
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useGetSearch({ search: searchTerm });
  const { data: recentData, isLoading: isRecentLoading, isError: isRecentError } = useGetRecent();
  const {
    data: recommendationsData,
    isLoading: isRecommendationsLoading,
    isError: isRecommendationsError,
  } = useGetRecommendations();
  const { mutate: deleteRecent } = useDeleteRecent();
  const showInitialLoading = useMinLoading(
    isRecentLoading || isRecommendationsLoading,
    1200,
  );
  const showSearchLoading = useMinLoading(isSearchLoading, 1200);

  const isLoading =
    (!searchTerm && showInitialLoading) || (searchTerm && showSearchLoading);

  if (isSearchError || isRecentError || isRecommendationsError) {
    return <ErrorPage />;
  }

  return (
    <div className="bg-[#F5F6Fa] min-h-screen flex flex-col">
      <BackButtonHeader title="" />
      <div className="mb-[18px]">
        <TabBar items={tabItems} value={tab} onChange={(value) => setTab(value)} />
      </div>
      <div className="p-[20px]">
        <SearchBar
          value={searchText}
          placeholder={t('searchPlaceholder')}
          onChange={(value) => setSearchText(value)}
          onSubmit={async () => {
            setSearchTerm(searchText);
            await queryClient.invalidateQueries({ queryKey: archiverKeys.getRecent.all.queryKey });
          }}
        />
      </div>
      <div className="flex flex-col pt-[20px] gap-[32px] flex-1 min-h-0 overflow-y-auto scrollbar-hide">
        {isLoading ? (
          <div className="flex-1 flex w-full min-h-[200px]">
            <Loading
              text={t('loading')}
              role="ARCHIVER"
              transparentBg
            />
          </div>
        ) : null}

        {tab === 'all' && !searchTerm && !isLoading && (
          <>
            <RecentSearchSection
              histories={recentData?.data?.histories ?? []}
              onDelete={deleteRecent}
            />
            <RecommendationSection keywords={recommendationsData?.data?.keywords ?? []} />
          </>
        )}

        {tab === 'all' && searchTerm && !isLoading && searchData?.data && (
          <>
            {searchData.data.places.length === 0 && searchData.data.editors.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-[20px]">
                <p className="body-16-semibold text-neutral-40 text-center">{t('empty')}</p>
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

        {tab === 'info' &&
          searchTerm &&
          !isLoading &&
          searchData?.data &&
          searchData.data.places.length > 0 && (
          <InfoSection places={searchData.data.places} />
        )}

        {tab === 'editor' &&
          searchTerm &&
          !isLoading &&
          searchData?.data &&
          searchData.data.editors.length > 0 && (
            <EditorSection editors={searchData.data.editors} searchTerm={searchTerm} />
          )}
      </div>
    </div>
  );
};
