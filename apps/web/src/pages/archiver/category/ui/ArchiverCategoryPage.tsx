'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CATEGORIES } from '@/shared/constants/category';
import { OptionTabs } from '@/shared/ui/common/Tabs/OptionTabs';
import { useGetCategoryPlaceList } from '@/entities/archiver/category/queries/useGetCategoryPlaceList';
import { useGetNearbyPlaces } from '@/entities/archiver/place/queries/useGetNearbyPlaces';
import { requestNativeCurrentLocation as getCurrentLocation } from '@/shared/lib/native-actions';
import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import { Item } from '@/shared/ui/common/Item';
import { EyeIcon, FolderOutlineIcon, RightArrowIcon } from '@/shared/ui/icon';
import Image from 'next/image';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

const NEAR_CATEGORY_ID = 0;
const DEFAULT_CATEGORY_ID = NEAR_CATEGORY_ID;

const FALLBACK_LATITUDE = 37.5665;
const FALLBACK_LONGITUDE = 126.978;
// TODO : 폴백 이미지 제거..
const FALLBACK_PLACE_IMAGE = '/images/TestImage.png';
const CATEGORY_ID_TO_MARKER_URL: Record<number, string> = {
  [CATEGORIES[0].id]: '/marker/koreanMarker.png',
  [CATEGORIES[1].id]: '/marker/westernMarker.png',
  [CATEGORIES[2].id]: '/marker/japaneseMarker.png',
  [CATEGORIES[3].id]: '/marker/cafeMarker.png',
  [CATEGORIES[4].id]: '/marker/dateMarker.png',
  [CATEGORIES[5].id]: '/marker/izakayaMarker.png',
  [CATEGORIES[6].id]: '/marker/etcMarker.png',
};
const DEFAULT_MARKER_URL = '/marker/defaultMarker.png';
const DEFAULT_SELECTED_MARKER_URL = '/marker/defaultMarkerSelected.png';
const MY_LOCATION_MARKER_URL = '/marker/myMarker.png';
const SKELETON_ITEM_COUNT = 5;

const toSelectedMarkerUrl = (url: string): string => {
  if (!url.endsWith('.png')) return url;
  return `${url.slice(0, -4)}Selected.png`;
};

const getNearPlaceCategoryId = (place: {
  categoryIds?: number[];
  categories?: number[];
}): number | undefined => {
  if (Array.isArray(place.categoryIds) && place.categoryIds.length > 0) {
    return place.categoryIds[0];
  }

  if (Array.isArray(place.categories) && place.categories.length > 0) {
    return place.categories[0];
  }

  return undefined;
};

const MapSkeleton = () => <div className="h-full w-full animate-pulse bg-neutral-20" />;

const PlaceListSkeleton = () => (
  <div className="px-5 pt-4">
    {[...Array(SKELETON_ITEM_COUNT)].map((unusedItem, index) => (
      <div key={`place-skeleton-${index}`} className="flex gap-3 py-3">
        <div className="h-18 w-18 shrink-0 animate-pulse rounded-2xl bg-neutral-20" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="h-5 w-2/3 animate-pulse rounded bg-neutral-20" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-20" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-20" />
        </div>
      </div>
    ))}
  </div>
);

export const ArchiverCategoryPage = (): React.ReactElement => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const categoryId = useMemo(() => {
    const raw = sp?.get('categoryId');
    const id = raw ? Number(raw) : NaN;

    if (!Number.isFinite(id)) return DEFAULT_CATEGORY_ID;
    if (id !== NEAR_CATEGORY_ID && !CATEGORIES.some((c) => c.id === id)) return DEFAULT_CATEGORY_ID;
    return id;
  }, [sp]);

  const isNear = categoryId === NEAR_CATEGORY_ID;

  const categoryTabs = useMemo(
    () => [
      { label: '내주변', value: NEAR_CATEGORY_ID },
      ...CATEGORIES.map((c) => ({ label: c.name, value: c.id })),
    ],
    [],
  );

  const categoryName = useMemo(
    () => CATEGORIES.find((c) => c.id === categoryId)?.name ?? '',
    [categoryId],
  );

  const [sheetOpen, setSheetOpen] = useState(true);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedMarkerPlaceId, setSelectedMarkerPlaceId] = useState<number | null>(null);
  const mapContextRef = useRef<{ kakao: typeof window.kakao; map: kakao.maps.Map } | null>(null);
  const isNearRef = useRef(isNear);

  useEffect(() => {
    isNearRef.current = isNear;
  }, [isNear]);

  const moveMapCenterToCoords = useCallback((latitude: number, longitude: number) => {
    const mapContext = mapContextRef.current;
    if (!mapContext) return;

    mapContext.map.setCenter(new mapContext.kakao.maps.LatLng(latitude, longitude));
  }, []);

  const refreshCurrentLocation = useCallback(
    async (isCancelled?: () => boolean) => {
      try {
        const location = await getCurrentLocation();
        console.log('[ArchiverCategoryPage] getCurrentLocation success:', location);

        const latitude = location?.coords?.latitude ?? FALLBACK_LATITUDE;
        const longitude = location?.coords?.longitude ?? FALLBACK_LONGITUDE;

        if (isCancelled?.() || !isNearRef.current) return;
        setCoords({ latitude, longitude });
        moveMapCenterToCoords(latitude, longitude);
      } catch (error) {
        console.error('[ArchiverCategoryPage] getCurrentLocation error:', error);

        if (isCancelled?.() || !isNearRef.current) return;
        setCoords({ latitude: FALLBACK_LATITUDE, longitude: FALLBACK_LONGITUDE });
        moveMapCenterToCoords(FALLBACK_LATITUDE, FALLBACK_LONGITUDE);
      }
    },
    [moveMapCenterToCoords],
  );

  const setCategory = (nextId: number) => {
    if (nextId === categoryId) {
      if (nextId === NEAR_CATEGORY_ID) {
        if (coords) {
          moveMapCenterToCoords(coords.latitude, coords.longitude);
        }
        refreshCurrentLocation().catch(() => undefined);
      }
      return;
    }

    // TODO : 내주변 가드 치우기
    // if (nextId === NEAR_CATEGORY_ID) {
    //   alert('준비중이에요!');
    //   return;
    // }

    const params = new URLSearchParams(sp?.toString() ?? '');
    params.set('categoryId', String(nextId));

    const qs = params.toString();
    const path = pathname ?? '/archiver/category';
    router.replace(qs ? `${path}?${qs}` : path);
  };

  useEffect(() => {
    if (!isNear) {
      setCoords(null);
      setSelectedMarkerPlaceId(null);
      mapContextRef.current = null;
      return;
    }

    let cancelled = false;

    refreshCurrentLocation(() => cancelled).catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [isNear, refreshCurrentLocation]);

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useGetCategoryPlaceList({
    categoryId,
    useMock: false,
    enabled: !isNear,
  });

  const {
    data: nearData,
    isLoading: isNearLoading,
    isError: isNearError,
  } = useGetNearbyPlaces({
    latitude: coords?.latitude ?? FALLBACK_LATITUDE,
    longitude: coords?.longitude ?? FALLBACK_LONGITUDE,
    useMock: false,
    enabled: isNear && Boolean(coords),
  });
  const data = isNear ? nearData : categoryData;
  const isRawLoading = isNear ? isNearLoading : isCategoryLoading;
  const isLoading = useMinLoading(isRawLoading);
  const isError = isNear ? isNearError : isCategoryError;
  const isNearMapLoading = isNear && (!coords || isLoading);
  const isNearListLoading = isNear && (!coords || isLoading);

  const apiErrorMessage = data && data.data === null ? data.message : null;
  const places = data?.data?.places ?? [];
  const totalCount = data?.data?.totalCount ?? 0;
  const canShowCategoryList = !isNear && !isLoading && !isError && !apiErrorMessage;
  const nearDisplayedPlaces = useMemo(() => {
    if (!isNear) return [];
    if (selectedMarkerPlaceId === null) return places;

    return places.filter((place) => place.placeId === selectedMarkerPlaceId);
  }, [isNear, places, selectedMarkerPlaceId]);
  const nearPlaceMarkers = useMemo(
    () =>
      isNear
        ? (nearData?.data?.places ?? [])
            .filter((place) => Number.isFinite(place.latitude) && Number.isFinite(place.longitude))
            .map((place) => {
              const isSelected =
                selectedMarkerPlaceId !== null && place.placeId === selectedMarkerPlaceId;
              const categoryId = getNearPlaceCategoryId(place);
              const defaultImageSrc =
                (categoryId !== undefined ? CATEGORY_ID_TO_MARKER_URL[categoryId] : undefined) ??
                DEFAULT_MARKER_URL;
              const selectedImageSrc =
                defaultImageSrc === DEFAULT_MARKER_URL
                  ? DEFAULT_SELECTED_MARKER_URL
                  : toSelectedMarkerUrl(defaultImageSrc);
              const imageSrc = isSelected ? selectedImageSrc : defaultImageSrc;

              return {
                id: place.placeId,
                lat: place.latitude,
                lng: place.longitude,
                zIndex: isSelected ? 100 : 1,
                imageSrc,
                imageSize: isSelected ? { width: 60, height: 85.2 } : { width: 45, height: 63.9 },
                imageOffset: isSelected ? { x: 30, y: 85.2 } : { x: 22.5, y: 63.9 },
              };
            })
        : [],
    [isNear, nearData, selectedMarkerPlaceId],
  );

  useEffect(() => {
    if (!isNear || selectedMarkerPlaceId === null) return;

    const exists = (nearData?.data?.places ?? []).some(
      (place) => place.placeId === selectedMarkerPlaceId,
    );
    if (!exists) {
      setSelectedMarkerPlaceId(null);
    }
  }, [isNear, nearData, selectedMarkerPlaceId]);

  return (
    <div className="flex h-full flex-col min-h-0">
      <OptionTabs
        items={categoryTabs}
        value={categoryId}
        onChange={setCategory}
        containerClassName="px-5 flex gap-2 overflow-x-auto whitespace-nowrap scroll-none pt-4"
      />

      {isNear ? (
        <div className="flex-1 min-h-0 pt-6">
          <div className="relative h-full w-full">
            <KakaoMap
              lat={coords?.latitude ?? FALLBACK_LATITUDE}
              lng={coords?.longitude ?? FALLBACK_LONGITUDE}
              level={3}
              onMarkerClick={({ id }) => {
                if (typeof id !== 'number') return;
                setSelectedMarkerPlaceId(id);
                setSheetOpen(true);
              }}
              onMapClick={() => {
                setSelectedMarkerPlaceId(null);
                setSheetOpen(false);
              }}
              onReady={({ kakao, map }) => {
                mapContextRef.current = { kakao, map };
                const latitude = coords?.latitude ?? FALLBACK_LATITUDE;
                const longitude = coords?.longitude ?? FALLBACK_LONGITUDE;
                map.setCenter(new kakao.maps.LatLng(latitude, longitude));
              }}
              markers={
                isNear
                  ? [
                      ...nearPlaceMarkers,
                      ...(coords
                        ? [
                            {
                              lat: coords.latitude,
                              lng: coords.longitude,
                              zIndex: 200,
                              imageSrc: MY_LOCATION_MARKER_URL,
                              imageSize: { width: 48, height: 68 },
                              imageOffset: { x: 24, y: 68 },
                            },
                          ]
                        : []),
                    ]
                  : []
              }
            />
            {isNearMapLoading ? (
              <div className="pointer-events-none absolute inset-0">
                <MapSkeleton />
              </div>
            ) : null}
          </div>

          <BottomSheet
            isOpen={sheetOpen}
            onOpenChange={setSheetOpen}
            height={500}
            peekHeight={72}
            header={
              <div className="px-5 pb-4 pt-2.5">
                <p className="heading-20-bold">
                  내주변 <span className="text-primary-40 pl-1">{nearDisplayedPlaces.length}</span>
                </p>
              </div>
            }
            contentClassName="overflow-y-auto px-0 pb-6"
          >
            {isNearListLoading ? <PlaceListSkeleton /> : null}
            {!isNearListLoading && isError ? <div className="px-5 pt-6">불러오기 실패</div> : null}
            {!isNearListLoading && apiErrorMessage ? (
              <div className="px-5 pt-6">{apiErrorMessage}</div>
            ) : null}

            {!isNearListLoading && !isError && !apiErrorMessage ? (
              nearDisplayedPlaces.length === 0 ? (
                <div className="flex flex-1 items-center justify-center py-30">
                  <p className="body-16-semibold text-neutral-40 text-center whitespace-pre-wrap">
                    {'이 카테고리에 저장된 장소가 없어요.\n다른 카테고리를 선택해 보세요.'}
                  </p>
                </div>
              ) : (
                nearDisplayedPlaces.map((p) => (
                  <Item
                    key={p.placeId}
                    thumbnail={
                      <div className="relative h-18 w-18 overflow-hidden rounded-2xl bg-neutral-30">
                        <Image
                          src={p.imageUrl || FALLBACK_PLACE_IMAGE}
                          alt={p.placeName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    }
                    onClick={() => router.push(`/archiver/place-info/${p.placeId}`)}
                  >
                    <div className="flex flex-col pl-2 min-w-0">
                      <p className="body-16-semibold flex flex-row items-center justify-between">
                        <span className="truncate">{p.placeName}</span>
                        <RightArrowIcon />
                      </p>

                      <p className="body-14-semibold text-neutral-50 w-53 truncate pt-0.75">
                        {p.latestDescription}
                      </p>

                      <div className="flex flex-row gap-2 caption-12-regular text-primary-50 pt-1">
                        <p className="flex flex-row items-center gap-1">
                          <FolderOutlineIcon className="w-4 text-primary-30" />
                          {p.saveCount}
                        </p>
                        <p className="flex flex-row items-center gap-1">
                          <EyeIcon className="w-4 text-primary-30" />
                          {p.viewCount}
                        </p>
                      </div>
                    </div>
                  </Item>
                ))
              )
            ) : null}
          </BottomSheet>
        </div>
      ) : (
        <>
          <div className="px-5 pt-6">
            <p className="heading-20-bold">
              {categoryName} <span className="text-primary-40">{totalCount}</span>
            </p>
          </div>

          {isLoading ? <PlaceListSkeleton /> : null}
          {isError ? <div className="px-5 pt-6">불러오기 실패</div> : null}
          {apiErrorMessage ? <div className="px-5 pt-6">{apiErrorMessage}</div> : null}

          {canShowCategoryList ? (
            <div className="flex-1 min-h-0 pt-2">
              {places.length === 0 ? (
                <div className="flex flex-1 items-center justify-center py-30">
                  <p className="body-16-semibold text-neutral-40 text-center whitespace-pre-wrap">
                    {'이 카테고리에 저장된 장소가 없어요.\n다른 카테고리를 선택해 보세요.'}
                  </p>
                </div>
              ) : (
                places.map((p) => (
                  <Item
                    disableActive
                    key={p.placeId}
                    thumbnail={
                      <div className="relative h-18 w-18 overflow-hidden rounded-2xl bg-neutral-30">
                        <Image
                          src={p.imageUrl || FALLBACK_PLACE_IMAGE}
                          alt={p.placeName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    }
                    onClick={() => router.push(`/archiver/place-info/${p.placeId}`)}
                  >
                    <div className="flex flex-col pl-2 min-w-0">
                      <p className="body-16-semibold flex flex-row items-center justify-between">
                        <span className="truncate text-primary-40">{p.placeName}</span>
                        <RightArrowIcon />
                      </p>

                      <p className="body-14-semibold text-neutral-50 w-53 truncate pt-0.75">
                        {p.latestDescription}
                      </p>

                      <div className="flex flex-row gap-2 caption-12-regular text-primary-50 pt-1">
                        <p className="flex flex-row items-center gap-1">
                          <FolderOutlineIcon className="w-4 text-primary-30" />
                          {p.saveCount}
                        </p>
                        <p className="flex flex-row items-center gap-1">
                          <EyeIcon className="w-4 text-primary-30" />
                          {p.viewCount}
                        </p>
                      </div>
                    </div>
                  </Item>
                ))
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
