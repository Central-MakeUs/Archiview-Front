'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CATEGORIES } from '@/shared/constants/category';
import { OptionTabs } from '@/shared/ui/common/Tabs/OptionTabs';
import { useGetCategoryPlaceList } from '@/entities/archiver/category/queries/useGetCategoryPlaceList';
import { useGetNearbyPlaces } from '@/entities/archiver/place/queries/useGetNearbyPlaces';
import { getCurrentLocation } from '@/shared/lib/native-bridge/nativeMethods.client';
import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import { Item } from '@/shared/ui/common/Item';
import { EyeIcon, FolderOutlineIcon, RightArrowIcon } from '@/shared/ui/icon';

const NEAR_CATEGORY_ID = 0;
const DEFAULT_CATEGORY_ID = NEAR_CATEGORY_ID;

const FALLBACK_LATITUDE = 37.5665;
const FALLBACK_LONGITUDE = 126.978;

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

  const setCategory = (nextId: number) => {
    // TODO : 내주변 가드 치우기
    if (nextId === NEAR_CATEGORY_ID) {
      alert('준비중이에요!');
      return;
    }

    const params = new URLSearchParams(sp?.toString() ?? '');
    params.set('categoryId', String(nextId));

    const qs = params.toString();
    const path = pathname ?? '/archiver/category';
    router.replace(qs ? `${path}?${qs}` : path);
  };

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

  useEffect(() => {
    if (!isNear) return;
    if (coords) return;

    let cancelled = false;

    const run = async () => {
      // const location = await getCurrentLocation();
      // const latitude = location?.coords?.latitude ?? FALLBACK_LATITUDE;
      const latitude = FALLBACK_LATITUDE;
      // const longitude = location?.coords?.longitude ?? FALLBACK_LONGITUDE;
      const longitude = FALLBACK_LONGITUDE;

      if (cancelled) return;
      setCoords({ latitude, longitude });
    };

    run()
      .catch(() => {
        if (cancelled) return;
        setCoords({ latitude: FALLBACK_LATITUDE, longitude: FALLBACK_LONGITUDE });
      })
      .finally(() => {
        if (cancelled) return;
      });

    return () => {
      cancelled = true;
    };
  }, [coords, isNear]);

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
  const isLoading = isNear ? isNearLoading : isCategoryLoading;
  const isError = isNear ? isNearError : isCategoryError;

  const apiErrorMessage = data && data.data === null ? data.message : null;
  const places = data?.data?.places ?? [];
  const totalCount = data?.data?.totalCount ?? 0;

  const canShowCategoryList = !isNear && !isLoading && !isError && !apiErrorMessage;

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
          <KakaoMap
            lat={coords?.latitude ?? FALLBACK_LATITUDE}
            lng={coords?.longitude ?? FALLBACK_LONGITUDE}
            level={3}
          />

          <BottomSheet
            isOpen={sheetOpen}
            onOpenChange={setSheetOpen}
            height={500}
            peekHeight={72}
            header={
              <div className="px-5 pb-4 pt-2.5">
                <p className="heading-20-bold">
                  내주변 <span className="text-primary-40 pl-1">{totalCount}</span>
                </p>
              </div>
            }
            contentClassName="overflow-y-auto px-0 pb-6"
          >
            {!coords ? <div className="px-5 pt-6">위치 불러오는 중...</div> : null}
            {coords && isLoading ? <div className="px-5 pt-6">로딩중...</div> : null}
            {coords && isError ? <div className="px-5 pt-6">불러오기 실패</div> : null}
            {coords && apiErrorMessage ? <div className="px-5 pt-6">{apiErrorMessage}</div> : null}

            {coords && !isLoading && !isError && !apiErrorMessage ? (
              places.length === 0 ? (
                <div className="px-5 pt-6">표시할 장소가 없습니다.</div>
              ) : (
                places.map((p) => (
                  <Item
                    key={p.placeId}
                    thumbnail={
                      <div className="h-18 w-18 overflow-hidden rounded-2xl bg-neutral-30" />
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

          {isLoading ? <div className="px-5 pt-6">로딩중...</div> : null}
          {isError ? <div className="px-5 pt-6">불러오기 실패</div> : null}
          {apiErrorMessage ? <div className="px-5 pt-6">{apiErrorMessage}</div> : null}

          {canShowCategoryList ? (
            <div className="flex-1 min-h-0 pt-2">
              {places.length === 0 ? (
                <div className="px-5 pt-6">표시할 장소가 없습니다.</div>
              ) : (
                places.map((p) => (
                  <Item
                    key={p.placeId}
                    thumbnail={
                      <div className="h-18 w-18 overflow-hidden rounded-2xl bg-neutral-30" />
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
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
