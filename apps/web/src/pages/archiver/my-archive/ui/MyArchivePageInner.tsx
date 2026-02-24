'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { requestNativeCurrentLocation } from '@/shared/lib/native-actions';
import type { GeoLocation } from '@archiview/webview-bridge-contract';
import { CATEGORIES } from '@/shared/constants/category';
import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import {
  CategoryOptionTabs,
  type ICategoryOptionValue,
} from '@/pages/editor/profile/CategoryOptionTabs';
import { useGetMyArchives } from '@/entities/archiver/place/queries/useGetMyArchives';

import { ArchiverPlaceItem } from './ArchiverPlaceItem';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';

interface IPlace {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  lat: number;
  lng: number;
  savedCount: number;
  viewCount: number;
  categoryIds: number[];
  categoryNames: string[];
}

export const MyArchivePageInner = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ICategoryOptionValue>({
    scope: '전체',
    categoryIds: [],
  });
  const [selectedPlaceId] = useState<string | null>(null);
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const { data, isLoading, isError } = useGetMyArchives({ useMock: false });

  const selectedCategoryNames = useMemo(() => {
    const names: string[] = [];

    categoryFilter.categoryIds.forEach((id) => {
      const category = CATEGORIES.find((item) => item.id === id);
      if (category) {
        names.push(category.name);
      }
    });

    return names;
  }, [categoryFilter.categoryIds]);

  useEffect(() => {
    if (categoryFilter.scope !== '내주변') {
      setLocation(null);
      return;
    }

    let cancelled = false;

    const run = async () => {
      const loc = await requestNativeCurrentLocation();
      if (cancelled) return;
      setLocation(loc);
    };

    run().catch(() => {
      if (cancelled) return;
      setLocation(null);
    });

    return () => {
      cancelled = true;
    };
  }, [categoryFilter.scope]);

  const places: IPlace[] = useMemo(() => {
    const postPlaces = data?.data?.postPlaces ?? [];

    return postPlaces.map((p) => ({
      id: String(p.postPlaceId),
      title: p.placeName,
      thumbnail: p.imageUrl,
      description: p.description ?? '',
      lat: 37.5665,
      lng: 126.978,
      categoryIds: [],
      categoryNames: [],
      savedCount: p.saveCount,
      viewCount: p.viewCount,
    }));
  }, [data]);

  const filteredPlaces = useMemo(() => {
    if (categoryFilter.categoryIds.length === 0) return places;

    return places.filter((place) => {
      if (place.categoryIds.some((id) => categoryFilter.categoryIds.includes(id))) {
        return true;
      }

      return selectedCategoryNames.some((name) => place.categoryNames.includes(name));
    });
  }, [categoryFilter.categoryIds, places, selectedCategoryNames]);

  const selectedPlace = useMemo(
    () => filteredPlaces.find((p) => p.id === selectedPlaceId) ?? null,
    [filteredPlaces, selectedPlaceId],
  );

  const mapLat =
    categoryFilter.scope === '내주변' && location
      ? location.coords.latitude
      : (selectedPlace?.lat ?? 37.5665);
  const mapLng =
    categoryFilter.scope === '내주변' && location
      ? location.coords.longitude
      : (selectedPlace?.lng ?? 126.978);

  if (isLoading) {
    return <LoadingPage text="내 아카이브를 불러오는 중입니다." role="ARCHIVER" />;
  }

  if (isError) {
    return <div className="px-5 pt-6">불러오기 실패</div>;
  }

  return (
    <div className="flex h-full flex-col min-h-0">
      <CategoryOptionTabs value={categoryFilter} onChange={setCategoryFilter} />
      <pre>
        {/* {location
          ? JSON.stringify(location, null, 2)
          : 'loading (or not in WebView / permission denied)'} */}
      </pre>
      <div className="flex-1 min-h-0 pt-6">
        <KakaoMap
          lat={mapLat}
          lng={mapLng}
          level={3}
          marker={
            categoryFilter.scope === '내주변' && location
              ? {
                  lat: location.coords.latitude,
                  lng: location.coords.longitude,
                }
              : undefined
          }
        />
        {/* TODO : 주석 해제 */}
        <BottomSheet
          isOpen={open}
          onOpenChange={setOpen}
          height={500}
          peekHeight={72}
          header={
            <div className="px-5 pb-4 pt-2.5">
              <p className="heading-20-bold">
                {categoryFilter.scope}{' '}
                <span className="text-primary-40 pl-1">{filteredPlaces.length}</span>
              </p>
            </div>
          }
          contentClassName="overflow-y-auto px-0 pb-6"
        >
          {filteredPlaces.map((p) => (
            <ArchiverPlaceItem
              key={p.id}
              name={p.title}
              thumbnail={p.thumbnail}
              description={p.description}
              savedCount={p.savedCount}
              viewCount={p.viewCount}
              onClick={() => router.push(`/archiver/place-info/${p.id}`)}
            />
          ))}
        </BottomSheet>
      </div>
    </div>
  );
};
