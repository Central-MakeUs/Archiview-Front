'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import { CategoryOptionTabs, type CategoryTab } from '@/pages/editor/profile/CategoryOptionTabs';
import { useGetEditorProfile } from '@/entities/archiver/profile/queries/useGetEditorProfile';
import { useGetEditorPlaceList } from '@/entities/archiver/profile/queries/useGetEditorPlaceList';

import { ArchiverPlaceItem } from '../../my-archive/ui/ArchiverPlaceItem';
import { EditorProfileCard } from './EditorProfileCard';
import { SortDropdown } from './SortDropDown';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

type SortKey = 'LATEST' | 'OLDEST';

export const EditorProfilePage = ({ editorId }: { editorId: string }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryTab>('전체');
  const [sort, setSort] = useState<SortKey>('LATEST');

  const { data: editorData, isLoading: isEditorDataLoading } = useGetEditorProfile({
    editorId,
    useMock: false,
  });
  const { data: placeListData, isLoading: isPlaceListLoading } = useGetEditorPlaceList({
    userId: editorId,
    sort,
    useMock: false,
  });

  const places = placeListData?.data?.postPlaces ?? [];

  const filteredPlaces = useMemo(() => {
    if (category === '전체') return places;

    // NEAR는 지금 지도 기반 로직이 없으니 일단 전체 반환(또는 빈 배열)
    if (category === '내주변') return places;

    return places.filter((p: any) => {
      // p.categoryNames가 string[]이라고 가정
      return Array.isArray(p.categoryNames) && p.categoryNames.includes(category);
    });
  }, [places, category]);

  const editor = editorData?.data;

  const showLoading = useMinLoading(isEditorDataLoading || isPlaceListLoading, 1500);
  if (!editor)
    return showLoading ? (
      <LoadingPage text="에디터 프로필을 불러오는 중입니다." role="ARCHIVER" />
    ) : null;

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="px-5">
        <EditorProfileCard editorId={editorId} editorData={editorData?.data} />
      </div>
      <CategoryOptionTabs value={category} onChange={setCategory} />

      <div className="flex-1 min-h-0 pt-6">
        {/* <div className="h-100 pt-6"> */}
        <KakaoMap
          lat={37.5665}
          lng={126.978}
          level={3}
          // TODO: 마커
        />


          <BottomSheet
            isOpen={open}
            onOpenChange={setOpen}
            height={500}
            peekHeight={72}
            header={
              <div className="flex flex-row justify-between pb-4 pt-2.5 px-5">
                <p className="heading-20-bold">
                  업로드한 장소 <span className="text-primary-40 pl-1">{filteredPlaces.length}</span>
                </p>
                <SortDropdown value={sort} onChange={setSort} />
              </div>
            }
            contentClassName="overflow-y-auto px-5 pb-6"
          >
            {filteredPlaces.map((p) => (
              <ArchiverPlaceItem
                key={p.postPlaceId}
                name={p.placeName}
                thumbnail={p.imageUrl}
                description={p.description}
                savedCount={p.saveCount}
                viewCount={p.viewCount}
                onClick={() => router.push(`/archiver/place-info/${p.postPlaceId}`)}
              />
            ))}
          </BottomSheet>

      </div>
    </div>
  );
};
