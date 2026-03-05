'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GeoLocation } from '@archiview/webview-bridge-contract';

import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import { CATEGORIES } from '@/shared/constants/category';
import { requestNativeCurrentLocation } from '@/shared/lib/native-actions';
import type { IPin } from '@/entities/editor/place/model/editorPlace.type';
import { useGetMyPlacePin } from '@/entities/editor/place/queries/useGetMyPlacePin';
import { useGetMyPlaceList } from '@/entities/editor/place/queries/useGetMyPlaceList';

import { EditorPlaceItem } from '../../../../entities/editor/place/ui/EditorPlaceItem';

import { CategoryOptionTabs, type ICategoryOptionValue } from '../CategoryOptionTabs';
import { HamburgerIcon } from '@/shared/ui/icon/HamburgerIcon';
import { EditorProfileCard } from './EditorProfileCard';

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

const toSelectedMarkerUrl = (url: string): string => {
  if (!url.endsWith('.png')) return url;
  return `${url.slice(0, -4)}Selected.png`;
};

const getMarkerScaleByLevel = (level: number): number => {
  if (level >= 9) return 0.6;
  if (level >= 7) return 0.6;
  if (level >= 5) return 0.8;
  return 1;
};

const getMarkerCategoryId = (pin: IPin): number | undefined => {
  if (Array.isArray(pin.categoryIds) && pin.categoryIds.length > 0) {
    return pin.categoryIds[0];
  }

  return undefined;
};

const PLACE_SKELETON_ITEMS = [0, 1, 2, 3];

const PlaceListSkeleton = () => (
  <div className="px-5 pt-4">
    {PLACE_SKELETON_ITEMS.map((index) => (
      <div key={`editor-my-place-skeleton-${index}`} className="flex gap-3 py-3">
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

interface IEditorProfile {
  nickname: string;
  instagramId?: string;
  introduction?: string;
  hashtags?: string[];
  profileImageUrl?: string;
}

export const EditorProfilePageInner = ({ profile }: { profile: IEditorProfile }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ICategoryOptionValue>({
    scope: '전체',
    categoryIds: [],
  });
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [mapLevel, setMapLevel] = useState(3);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(350);
  const [selectedMarkerPlaceId, setSelectedMarkerPlaceId] = useState<number | null>(null);
  const shouldMoveToNearbyRef = useRef(false);

  const mapFilter = categoryFilter.scope === '내주변' ? 'NEARBY' : 'ALL';
  const nearbyLatitude = categoryFilter.scope === '내주변' ? location?.coords.latitude : undefined;
  const nearbyLongitude =
    categoryFilter.scope === '내주변' ? location?.coords.longitude : undefined;

  const {
    data: placeListData,
    isLoading: isPlaceListLoading,
    isError: isPlaceListError,
  } = useGetMyPlaceList({
    filter: mapFilter,
    categoryId: categoryFilter.categoryIds[0],
    latitude: nearbyLatitude,
    longitude: nearbyLongitude,
    useMock: false,
  });

  const { data: placePinData } = useGetMyPlacePin({
    filter: mapFilter,
    categoryId: categoryFilter.categoryIds[0],
    latitude: nearbyLatitude,
    longitude: nearbyLongitude,
    useMock: false,
  });

  const places = placeListData?.data?.places ?? [];

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
      setBottomSheetHeight(Math.round(window.innerHeight * 0.35));
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

  const filteredPlaces = places;
  const mapPins = placePinData?.data?.pins ?? [];

  const mapMarkers = useMemo(() => {
    const markerScale = getMarkerScaleByLevel(mapLevel);

    return [
      ...(categoryFilter.scope === '내주변' && location
        ? [
            {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
              zIndex: 200,
              imageSrc: MY_LOCATION_MARKER_URL,
              imageSize: { width: 48 * markerScale, height: 68 * markerScale },
              imageOffset: { x: 24 * markerScale, y: 68 * markerScale },
            },
          ]
        : []),
      ...mapPins
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
            imageSize: isSelected
              ? { width: 60 * markerScale, height: 85.2 * markerScale }
              : { width: 45 * markerScale, height: 63.9 * markerScale },
            imageOffset: isSelected
              ? { x: 30 * markerScale, y: 85.2 * markerScale }
              : { x: 22.5 * markerScale, y: 63.9 * markerScale },
          };
        }),
    ];
  }, [categoryFilter.scope, location, mapLevel, mapPins, selectedMarkerPlaceId]);

  const selectedMarkerPin = useMemo(
    () => mapPins.find((pin) => pin.placeId === selectedMarkerPlaceId) ?? null,
    [mapPins, selectedMarkerPlaceId],
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

    const exists = mapPins.some((pin) => pin.placeId === selectedMarkerPlaceId);
    if (!exists) {
      setSelectedMarkerPlaceId(null);
    }
  }, [mapPins, selectedMarkerPlaceId]);

  const handleEditProfile = () => {
    router.push('/mypage/edit-profile');
  };

  const handleShareInfo = () => {
    router.push('/editor/register-place');
  };

  if (isPlaceListLoading && !placeListData) {
    return (
      <div className="flex h-full flex-col min-h-0">
        <div className="pt-1">
          <EditorProfileCard
            nickname={profile.nickname}
            instagramId={profile.instagramId}
            introduction={profile.introduction}
            hashtags={profile.hashtags}
            profileImageUrl={profile.profileImageUrl}
            onEdit={handleEditProfile}
            onShareInfo={handleShareInfo}
          />
        </div>
        <CategoryOptionTabs value={categoryFilter} onChange={setCategoryFilter} />
        <div className="relative flex-1 min-h-0 pt-4">
          <div className="h-full w-full animate-pulse bg-neutral-20" />
          <div className="absolute left-1/4 top-1/3 h-4 w-4 animate-pulse rounded-full bg-neutral-10" />
          <div className="absolute right-1/3 top-1/2 h-3 w-3 animate-pulse rounded-full bg-neutral-10" />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-neutral-10/95 px-5 pb-6 pt-4 shadow-default">
            <div className="mb-2 h-6 w-32 animate-pulse rounded bg-neutral-20" />
            <PlaceListSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (isPlaceListError && !placeListData) {
    return <div className="px-5 pt-6">불러오기 실패</div>;
  }

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="pt-1">
        <EditorProfileCard
          nickname={profile.nickname}
          instagramId={profile.instagramId}
          introduction={profile.introduction}
          hashtags={profile.hashtags}
          profileImageUrl={profile.profileImageUrl}
          onEdit={handleEditProfile}
          onShareInfo={handleShareInfo}
        />
      </div>

      <CategoryOptionTabs value={categoryFilter} onChange={setCategoryFilter} />

      <div className="flex-1 min-h-0 pt-4">
        <KakaoMap
          lat={mapCenter.lat}
          lng={mapCenter.lng}
          level={3}
          markers={mapMarkers}
          onReady={({ kakao, map }) => {
            setMapLevel(map.getLevel());
            kakao.maps.event.addListener(map, 'zoom_changed', () => {
              setMapLevel(map.getLevel());
            });
          }}
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
          bottomOffset={72}
          renderInPortal
          header={
            <div className="flex flex-row justify-between pb-4 pt-2.5 px-5">
              <p className="heading-20-bold">
                업로드한 장소{' '}
                <span className="text-primary-40 pl-1">{markerFilteredPlaces.length}</span>
              </p>
              <HamburgerIcon />
            </div>
          }
          contentClassName="overflow-y-auto px-5 pb-6"
        >
          {markerFilteredPlaces.map((place) => (
            <EditorPlaceItem
              key={place.placeId}
              placeId={place.placeId}
              name={place.placeName}
              description={place.editorSummary}
              savedCount={place.stats.saveCount}
              viewCount={place.stats.viewCount}
              shareCount={place.stats.directionCount}
              instagramCount={place.stats.instagramInflowCount}
              thumbnail={
                place.placeImageUrl ? (
                  <img
                    src={place.placeImageUrl}
                    alt={place.placeName}
                    className="h-18 w-18 rounded-2xl object-cover"
                  />
                ) : undefined
              }
            />
          ))}
        </BottomSheet>
      </div>
    </div>
  );
};
