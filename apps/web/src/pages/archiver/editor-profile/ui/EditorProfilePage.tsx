'use client';

import { useMemo, useState } from 'react';

import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import { CategoryOptionTabs } from '@/pages/editor/profile/CategoryOptionTabs';
import { HamburgerIcon } from '@/shared/ui/icon/HamburgerIcon';

import { EditorProfileCard } from './EditorProfileCard';

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

export const EditorProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryTab>('ALL');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="px-5">
        <EditorProfileCard />
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

        <BottomSheet isOpen={open} onOpenChange={setOpen} height={500} peekHeight={72}>
          <div className="px-5 pb-6">
            <div className="flex flex-row justify-between pb-4 pt-2.5">
              <p className="heading-20-bold">
                업로드한 장소 <span className="text-primary-40 pl-1">숫자</span>
              </p>
              <HamburgerIcon />
            </div>
            {/* {filteredPlaces.map((p) => (
              <ArchiverPlaceItem
                key={p.id}
                name={p.title}
                description={p.description}
                savedCount={p.savedCount}
                viewCount={p.viewCount}
              />
            ))} */}
          </div>
        </BottomSheet>
      </div>
    </div>
  );
};
