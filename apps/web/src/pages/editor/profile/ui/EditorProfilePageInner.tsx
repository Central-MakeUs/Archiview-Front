'use client';

import { useMemo, useState } from 'react';

import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';

import { EditorPlaceItem } from '../../../../entities/editor/place/ui/EditorPlaceItem';

import { CategoryOptionTabs } from '../CategoryOptionTabs';
import { HamburgerIcon } from '@/shared/ui/icon/HamburgerIcon';

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
  shareCount: number;
  instagramCount: number;
  category: CategoryTab;
}

export const EditorProfilePageInner = ({ initialPlaces }: { initialPlaces: IPlace[] }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryTab>('ALL');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const filteredPlaces = useMemo(() => {
    if (category === 'ALL') return initialPlaces;
    return initialPlaces.filter((p) => p.category === category);
  }, [initialPlaces, category]);

  const selectedPlace = useMemo(
    () => filteredPlaces.find((p) => p.id === selectedPlaceId) ?? null,
    [filteredPlaces, selectedPlaceId],
  );

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="bg-amber-400 h-50">프로필 카드 섹션</div>

      <CategoryOptionTabs value={category} onChange={setCategory} />

      <div className="flex-1 min-h-0 pt-6">
        <KakaoMap
          lat={selectedPlace?.lat ?? 37.5665}
          lng={selectedPlace?.lng ?? 126.978}
          level={3}
          // TODO: 마커
        />

        <BottomSheet isOpen={open} onOpenChange={setOpen} height={500} peekHeight={72}>
          <div className="px-5 pb-6">
            <div className="flex flex-row justify-between pb-4 pt-2.5">
              <p className="heading-20-bold">
                업로드한 장소 <span className="text-primary-40 pl-1">숫자</span>
              </p>
              <HamburgerIcon />
            </div>
            {filteredPlaces.map((p) => (
              <EditorPlaceItem
                key={p.id}
                name={p.title}
                description={p.description}
                savedCount={p.savedCount}
                viewCount={p.viewCount}
                shareCount={p.shareCount}
                instagramCount={p.instagramCount}
              />
            ))}
          </div>
        </BottomSheet>
      </div>
    </div>
  );
};
