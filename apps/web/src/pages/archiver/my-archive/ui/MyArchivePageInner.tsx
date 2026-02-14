'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import { CategoryOptionTabs } from '@/pages/editor/profile/CategoryOptionTabs';
import { useGetMyArchives } from '@/entities/archiver/place/queries/useGetMyArchives';

import { ArchiverPlaceItem } from './ArchiverPlaceItem';

export type CategoryTab =
  | 'ALL'
  | 'NEAR'
  | 'KOREAN'
  | 'WESTERN'
  | 'JAPANESE'
  | 'IZAKAYA'
  | 'CAFE'
  | 'DATE'
  | 'ETC';

interface IPlace {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  savedCount: number;
  viewCount: number;
  category: CategoryTab;
}

export const MyArchivePageInner = ({ initialPlaces }: { initialPlaces: IPlace[] }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryTab>('ALL');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetMyArchives({ useMock: false });

  const places: IPlace[] = useMemo(() => {
    const postPlaces = data?.data?.postPlaces ?? [];

    return postPlaces.map((p) => ({
      id: String(p.postPlaceId),
      title: p.placeName,
      description: p.description ?? '',
      lat: 37.5665,
      lng: 126.978,
      category: 'ALL',
      savedCount: p.saveCount,
      viewCount: p.viewCount,
    }));
  }, [data]);

  const filteredPlaces = useMemo(() => {
    if (category === 'ALL') return places;
    return places.filter((p) => p.category === category);
  }, [places, category]);

  const selectedPlace = useMemo(
    () => filteredPlaces.find((p) => p.id === selectedPlaceId) ?? null,
    [filteredPlaces, selectedPlaceId],
  );

  if (isLoading) {
    return <div className="px-5 pt-6">로딩중...</div>;
  }

  if (isError) {
    return <div className="px-5 pt-6">불러오기 실패</div>;
  }

  return (
    <div className="flex h-full flex-col min-h-0">
      <CategoryOptionTabs value={category} onChange={setCategory} />

      <div className="flex-1 min-h-0 pt-6">
        <KakaoMap
          lat={selectedPlace?.lat ?? 37.5665}
          lng={selectedPlace?.lng ?? 126.978}
          level={3}
          // TODO: 마커
        />

        <BottomSheet isOpen={open} onOpenChange={setOpen} height={500} peekHeight={72}>
          <div className="h-full px-5 pb-6 ">
           
            {filteredPlaces.map((p) => (
              <ArchiverPlaceItem
                key={p.id}
                name={p.title}
                description={p.description}
                savedCount={p.savedCount}
                viewCount={p.viewCount}
                onClick={() => router.push(`/archiver/place-info/${p.id}`)}
              />
            ))}
          </div>
        </BottomSheet>
      </div>
    </div>
  );
};
