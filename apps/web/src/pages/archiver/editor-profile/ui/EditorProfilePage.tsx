'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GeoLocation } from '@archiview/webview-bridge-contract';

import { CATEGORIES } from '@/shared/constants/category';
import { requestNativeCurrentLocation } from '@/shared/lib/native-actions';
import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import {
  CategoryOptionTabs,
  type ICategoryOptionValue,
} from '@/pages/editor/profile/CategoryOptionTabs';
import { useGetEditorProfile } from '@/entities/archiver/profile/queries/useGetEditorProfile';
import { useGetEditorPlaceList } from '@/entities/archiver/profile/queries/useGetEditorPlaceList';
import { useGetEditorPlacePins } from '@/entities/archiver/profile/queries/useGetEditorPlacePins';
import type { IPin } from '@/entities/archiver/profile/model/archiverProfile.type';

import { ArchiverPlaceItem } from '../../my-archive/ui/ArchiverPlaceItem';
import { EditorProfileCard } from './EditorProfileCard';
import { SortDropdown } from './SortDropDown';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

type SortKey = 'LATEST' | 'OLDEST';

const CATEGORY_ID_TO_MARKER_URL: Record<number, string> = {
  [CATEGORIES[0].id]: '/marker/koreanMarker.svg',
  [CATEGORIES[1].id]: '/marker/westernMarker.svg',
  [CATEGORIES[2].id]: '/marker/japaneseMarker.svg',
  [CATEGORIES[3].id]: '/marker/cafeMarker.svg',
  [CATEGORIES[4].id]: '/marker/dateMarker.svg',
  [CATEGORIES[5].id]: '/marker/izakayaMarker.svg',
  [CATEGORIES[6].id]: '/marker/etcMarker.svg',
};

const DEFAULT_MARKER_URL = '/marker/defaultMarker.svg';
const CATEGORY_NAME_BY_ID: Record<number, string> = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category.name]),
);

const getMarkerCategoryId = (pin: IPin): number | undefined => {
  if (Array.isArray(pin.categoryIds) && pin.categoryIds.length > 0) {
    return pin.categoryIds[0];
  }

  const categories = (pin as IPin & { categories?: number[] }).categories;
  if (Array.isArray(categories) && categories.length > 0) {
    return categories[0];
  }

  return undefined;
};

export const EditorProfilePage = ({ editorId }: { editorId: string }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ICategoryOptionValue>({
    scope: '전체',
    categoryIds: [],
  });
  const [sort, setSort] = useState<SortKey>('LATEST');
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const shouldMoveToNearbyRef = useRef(false);

  const mapFilter = categoryFilter.scope === '내주변' ? 'NEARBY' : 'ALL';
  const nearbyLatitude = categoryFilter.scope === '내주변' ? location?.coords.latitude : undefined;
  const nearbyLongitude =
    categoryFilter.scope === '내주변' ? location?.coords.longitude : undefined;

  const { data: editorData, isLoading: isEditorDataLoading } = useGetEditorProfile({
    editorId,
    useMock: false,
  });

  const { data: placeListData, isLoading: isPlaceListLoading } = useGetEditorPlaceList({
    userId: editorId,
    sort,
    useMock: false,
  });

  const { data: placePinsData } = useGetEditorPlacePins({
    editorId,
    filter: mapFilter,
    latitude: nearbyLatitude,
    longitude: nearbyLongitude,
    categoryIds: categoryFilter.categoryIds,
    useMock: false,
  });

  useEffect(() => {
    if (categoryFilter.scope !== '내주변') {
      shouldMoveToNearbyRef.current = false;
      setLocation(null);
      return;
    }

    shouldMoveToNearbyRef.current = true;

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

  useEffect(() => {
    if (categoryFilter.scope !== '내주변') return;
    if (!location) return;
    if (!shouldMoveToNearbyRef.current) return;

    setMapCenter({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    shouldMoveToNearbyRef.current = false;
  }, [categoryFilter.scope, location]);

  const mapPins = placePinsData?.data?.pins ?? [];

  const mapMarkers = useMemo(
    () =>
      mapPins
        .filter((pin) => Number.isFinite(pin.latitude) && Number.isFinite(pin.longitude))
        .map((pin) => {
          const categoryId = getMarkerCategoryId(pin);
          const imageSrc =
            (categoryId !== undefined ? CATEGORY_ID_TO_MARKER_URL[categoryId] : undefined) ??
            DEFAULT_MARKER_URL;

          return {
            lat: pin.latitude,
            lng: pin.longitude,
            imageSrc,
            imageSize: { width: 80, height: 80 },
            imageOffset: { x: 20, y: 40 },
          };
        }),
    [mapPins],
  );

  const places = placeListData?.data?.postPlaces ?? [];
  const selectedCategoryNames = useMemo(
    () =>
      categoryFilter.categoryIds
        .map((id) => CATEGORY_NAME_BY_ID[id])
        .filter((name): name is string => Boolean(name)),
    [categoryFilter.categoryIds],
  );

  const filteredPlaces = useMemo(() => {
    if (categoryFilter.categoryIds.length === 0) return places;

    return places.filter((place) => {
      const placeWithCategories = place as { categoryIds?: number[]; categoryNames?: string[] };

      if (
        Array.isArray(placeWithCategories.categoryIds) &&
        placeWithCategories.categoryIds.some((id) => categoryFilter.categoryIds.includes(id))
      ) {
        return true;
      }

      if (
        Array.isArray(placeWithCategories.categoryNames) &&
        selectedCategoryNames.some((name) => placeWithCategories.categoryNames?.includes(name))
      ) {
        return true;
      }

      return false;
    });
  }, [categoryFilter.categoryIds, places, selectedCategoryNames]);

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
      <CategoryOptionTabs value={categoryFilter} onChange={setCategoryFilter} />

      <div className="flex-1 min-h-0 pt-6">
        {/* <div className="h-100 pt-6"> */}
        <KakaoMap lat={mapCenter.lat} lng={mapCenter.lng} level={3} markers={mapMarkers} />

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
