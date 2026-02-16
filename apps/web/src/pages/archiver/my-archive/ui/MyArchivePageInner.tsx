'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentLocation } from '@/shared/lib/native-bridge/nativeMethods.client';
import type { GeoLocation } from '@archiview/webview-bridge-contract';
import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import { CategoryOptionTabs, type CategoryTab } from '@/pages/editor/profile/CategoryOptionTabs';
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
  category: CategoryTab;
}

export const MyArchivePageInner = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryTab>('전체');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const { data, isLoading, isError } = useGetMyArchives({ useMock: false });

  // useEffect(() => {
  //   const run = async () => {
  //     const loc = await getCurrentLocation();
  //     setLocation(loc);
  //   };
  //   run().catch(console.error);
  // }, []);

  // TODO : 내주변 가드한거 치우기
  const handleCategoryChange = (next: CategoryTab) => {
    if (next === '내주변') {
      alert('준비중이에요!');
      return;
    }

    setCategory(next);
  };

  const places: IPlace[] = useMemo(() => {
    const postPlaces = data?.data?.postPlaces ?? [];

    return postPlaces.map((p) => ({
      id: String(p.postPlaceId),
      title: p.placeName,
      thumbnail: p.imageUrl,
      description: p.description ?? '',
      lat: 37.5665,
      lng: 126.978,
      category: '전체',
      savedCount: p.saveCount,
      viewCount: p.viewCount,
    }));
  }, [data]);

  const filteredPlaces = useMemo(() => {
    // TODO : 주석 해제
    if (category === '전체' || category === '내주변') return places;
    return places.filter((p) => p.category === category);
  }, [places, category]);

  const selectedPlace = useMemo(
    () => filteredPlaces.find((p) => p.id === selectedPlaceId) ?? null,
    [filteredPlaces, selectedPlaceId],
  );

  if (isLoading) {
    return <LoadingPage text="내 아카이브를 불러오는 중입니다." role="ARCHIVER" />;
  }

  if (isError) {
    return <div className="px-5 pt-6">불러오기 실패</div>;
  }

  return (
    <div className="flex h-full flex-col min-h-0">
      <CategoryOptionTabs value={category} onChange={handleCategoryChange} />
      <pre>
        {/* {location
          ? JSON.stringify(location, null, 2)
          : 'loading (or not in WebView / permission denied)'} */}
      </pre>
      <div className="flex-1 min-h-0 pt-6">
        <KakaoMap
          lat={selectedPlace?.lat ?? 37.5665}
          lng={selectedPlace?.lng ?? 126.978}
          level={3}
          // TODO: 마커
        />
        {/* TODO : 주석 해제 */}
        <BottomSheet
          // isOpen={open}
          isOpen={true}
          lockOpen={true}
          onOpenChange={setOpen}
          // height={500}
          height={600}
          peekHeight={72}
          header={
            <div className="px-5 pb-4 pt-2.5">
              <p className="heading-20-bold">
                {category} <span className="text-primary-40 pl-1">{filteredPlaces.length}</span>
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
