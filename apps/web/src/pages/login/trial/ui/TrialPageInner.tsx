'use client';

import { useMemo, useState } from 'react';

import { CATEGORIES } from '@/shared/constants/category';
import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import {
  CategoryOptionTabs,
  type CategoryTab,
  type ICategoryOptionValue,
} from '@/pages/editor/profile/CategoryOptionTabs';
import { HamburgerIcon } from '@/shared/ui/icon/HamburgerIcon';
import { ArchiverPlaceItem } from '@/pages/archiver/my-archive/ui/ArchiverPlaceItem';

import { TrialFinishModal } from './TrialFinishModal';

interface IPlace {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  lat: number;
  lng: number;
  savedCount: number;
  viewCount: number;
  category: CategoryTab;
}

export const TrialPageInner = ({ initialPlaces }: { initialPlaces: IPlace[] }) => {
  const [open, setOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ICategoryOptionValue>({
    scope: '전체',
    categoryIds: [],
  });

  const [trialFinishOpen, setTrialFinishOpen] = useState(false);

  const selectedCategoryNames = useMemo(() => {
    const names: CategoryTab[] = [];

    categoryFilter.categoryIds.forEach((id) => {
      const category = CATEGORIES.find((item) => item.id === id);
      if (category) {
        names.push(category.name);
      }
    });

    return names;
  }, [categoryFilter.categoryIds]);

  const filteredPlaces = useMemo(() => {
    if (categoryFilter.categoryIds.length === 0) return initialPlaces;
    return initialPlaces.filter((place) => selectedCategoryNames.includes(place.category));
  }, [categoryFilter.categoryIds.length, initialPlaces, selectedCategoryNames]);

  return (
    <div className="flex h-full flex-col min-h-0">
      <CategoryOptionTabs value={categoryFilter} onChange={setCategoryFilter} />

      <div className="flex-1 min-h-0 pt-6">
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
            {filteredPlaces.map((p) => (
              <ArchiverPlaceItem
                onClick={() => setTrialFinishOpen(true)}
                key={p.id}
                name={p.title}
                thumbnail={p.thumbnail}
                description={p.description}
                savedCount={p.savedCount}
                viewCount={p.viewCount}
              />
            ))}
          </div>
        </BottomSheet>
      </div>

      <TrialFinishModal open={trialFinishOpen} setOpen={setTrialFinishOpen} />
    </div>
  );
};
