'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
import type { IPin } from '@/entities/archiver/place/model/archiverPlace.type';
import { useGetArchivePins } from '@/entities/archiver/place/queries/useGetArchivePins';
import { useGetMyArchives } from '@/entities/archiver/place/queries/useGetMyArchives';

import { ArchiverPlaceItem } from './ArchiverPlaceItem';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';

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
const DEFAULT_SELECTED_MARKER_URL = '/marker/defaultMarkerSelected.svg';

const toSelectedMarkerUrl = (url: string): string => {
  if (!url.endsWith('.svg')) return url;
  return `${url.slice(0, -4)}Selected.svg`;
};

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

export const MyArchivePageInner = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ICategoryOptionValue>({
    scope: '전체',
    categoryIds: [],
  });
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [bottomSheetHeight, setBottomSheetHeight] = useState(400);
  const [selectedMarkerPlaceId, setSelectedMarkerPlaceId] = useState<number | null>(null);
  const shouldMoveToNearbyRef = useRef(false);

  const mapFilter = categoryFilter.scope === '내주변' ? 'NEARBY' : 'ALL';
  const nearbyLatitude = categoryFilter.scope === '내주변' ? location?.coords.latitude : undefined;
  const nearbyLongitude =
    categoryFilter.scope === '내주변' ? location?.coords.longitude : undefined;

  const { data, isLoading, isError } = useGetMyArchives({ useMock: false });
  const { data: archivePinsData } = useGetArchivePins({
    filter: mapFilter,
    latitude: nearbyLatitude,
    longitude: nearbyLongitude,
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
    const updateBottomSheetHeight = () => {
      setBottomSheetHeight(Math.round(window.innerHeight * 0.45));
    };

    updateBottomSheetHeight();
    window.addEventListener('resize', updateBottomSheetHeight);

    return () => {
      window.removeEventListener('resize', updateBottomSheetHeight);
    };
  }, []);

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

  const archivePins = archivePinsData?.data?.pins ?? [];

  const categoryFilteredPins = useMemo(() => {
    if (categoryFilter.categoryIds.length === 0) return archivePins;

    return archivePins.filter((pin) =>
      pin.categoryIds.some((id) => categoryFilter.categoryIds.includes(id)),
    );
  }, [archivePins, categoryFilter.categoryIds]);

  const mapMarkers = useMemo(
    () =>
      categoryFilteredPins
        .filter((pin) => Number.isFinite(pin.latitude) && Number.isFinite(pin.longitude))
        .map((pin) => {
          const isSelected =
            selectedMarkerPlaceId !== null && pin.placeId === selectedMarkerPlaceId;
          const categoryId = getMarkerCategoryId(pin);
          const defaultImageSrc =
            (categoryId !== undefined ? CATEGORY_ID_TO_MARKER_URL[categoryId] : undefined) ??
            DEFAULT_MARKER_URL;
          const selectedImageSrc =
            defaultImageSrc === DEFAULT_MARKER_URL
              ? DEFAULT_SELECTED_MARKER_URL
              : toSelectedMarkerUrl(defaultImageSrc);
          const imageSrc = isSelected ? selectedImageSrc : defaultImageSrc;

          return {
            id: pin.placeId,
            lat: pin.latitude,
            lng: pin.longitude,
            zIndex: isSelected ? 100 : 1,
            imageSrc,
            imageSize: isSelected ? { width: 100, height: 100 } : { width: 80, height: 80 },
            imageOffset: isSelected ? { x: 23, y: 46 } : { x: 20, y: 40 },
          };
        }),
    [categoryFilteredPins, selectedMarkerPlaceId],
  );

  const places = data?.data?.postPlaces ?? [];

  const filteredPlaces = useMemo(() => {
    if (categoryFilter.categoryIds.length === 0) return places;

    const allowedPlaceIds = new Set(categoryFilteredPins.map((pin) => pin.placeId));

    return places.filter((place) => allowedPlaceIds.has(place.placeId));
  }, [categoryFilter.categoryIds, categoryFilteredPins, places]);

  const selectedMarkerPin = useMemo(
    () => categoryFilteredPins.find((pin) => pin.placeId === selectedMarkerPlaceId) ?? null,
    [categoryFilteredPins, selectedMarkerPlaceId],
  );

  const markerFilteredPlaces = useMemo(() => {
    if (selectedMarkerPlaceId === null) return filteredPlaces;

    const selectedPinName = selectedMarkerPin?.name;

    return filteredPlaces.filter((place) => {
      if (place.placeId === selectedMarkerPlaceId) return true;

      if (selectedPinName) {
        return place.placeName === selectedPinName;
      }

      return false;
    });
  }, [filteredPlaces, selectedMarkerPin, selectedMarkerPlaceId]);

  useEffect(() => {
    if (selectedMarkerPlaceId === null) return;

    const exists = categoryFilteredPins.some((pin) => pin.placeId === selectedMarkerPlaceId);
    if (!exists) {
      setSelectedMarkerPlaceId(null);
    }
  }, [categoryFilteredPins, selectedMarkerPlaceId]);

  if (isLoading) {
    return <LoadingPage text="내 아카이브를 불러오는 중입니다." role="ARCHIVER" />;
  }

  if (isError) {
    return <div className="px-5 pt-6">불러오기 실패</div>;
  }

  return (
    <div className="flex h-full flex-col min-h-0">
      <CategoryOptionTabs value={categoryFilter} onChange={setCategoryFilter} />
      <div className="flex-1 min-h-0 pt-6">
        <KakaoMap
          lat={mapCenter.lat}
          lng={mapCenter.lng}
          level={3}
          markers={mapMarkers}
          onMarkerClick={({ id }) => {
            if (typeof id !== 'number') return;
            setSelectedMarkerPlaceId(id);
            setOpen(true);
          }}
          onMapClick={() => {
            setSelectedMarkerPlaceId(null);
          }}
        />
        <BottomSheet
          isOpen={open}
          onOpenChange={setOpen}
          height={bottomSheetHeight}
          peekHeight={72}
          header={
            <div className="px-5 pb-4 pt-2.5">
              <p className="heading-20-bold">
                {categoryFilter.scope}{' '}
                <span className="text-primary-40 pl-1">{markerFilteredPlaces.length}</span>
              </p>
            </div>
          }
          contentClassName="overflow-y-auto px-0 pb-6"
        >
          {markerFilteredPlaces.map((p) => (
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
