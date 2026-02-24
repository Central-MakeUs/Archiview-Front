'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GeoLocation } from '@archiview/webview-bridge-contract';

import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';
import { CATEGORIES } from '@/shared/constants/category';
import { requestNativeCurrentLocation } from '@/shared/lib/native-actions';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { useGetMyPlaceList } from '@/entities/editor/place/queries/useGetMyPlaceList';

import { EditorPlaceItem } from '../../../../entities/editor/place/ui/EditorPlaceItem';

import { CategoryOptionTabs, type ICategoryOptionValue } from '../CategoryOptionTabs';
import { HamburgerIcon } from '@/shared/ui/icon/HamburgerIcon';
import { EditorProfileCard } from './EditorProfileCard';

import type { IEditorInsightPlace } from '@/entities/editor/place/model/editorPlace.type';

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

interface IEditorProfile {
  nickname: string;
  instagramId?: string;
  introduction?: string;
  hashtags?: string[];
  profileImageUrl?: string;
}

export const EditorProfilePageInner = ({ profile }: { profile: IEditorProfile }) => {
  type PlaceWithMap = IEditorInsightPlace & {
    latitude?: number;
    longitude?: number;
    categoryIds?: number[];
    categoryNames?: string[];
  };

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

  const places = (placeListData?.data?.places ?? []) as PlaceWithMap[];

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

  const filteredPlaces = useMemo(() => {
    if (categoryFilter.categoryIds.length === 0) {
      return places;
    }

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

  const mapMarkers = useMemo(
    () =>
      filteredPlaces
        .filter((place) => Number.isFinite(place.latitude) && Number.isFinite(place.longitude))
        .map((place) => {
          const isSelected =
            selectedMarkerPlaceId !== null && place.placeId === selectedMarkerPlaceId;

          const categoryId =
            place.categoryIds?.[0] ??
            CATEGORIES.find((category) => place.categoryNames?.includes(category.name))?.id;

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
            lat: place.latitude as number,
            lng: place.longitude as number,
            zIndex: isSelected ? 100 : 1,
            imageSrc,
            imageSize: isSelected ? { width: 100, height: 100 } : { width: 80, height: 80 },
            imageOffset: isSelected ? { x: 23, y: 46 } : { x: 20, y: 40 },
          };
        }),
    [filteredPlaces, selectedMarkerPlaceId],
  );

  const markerFilteredPlaces = useMemo(() => {
    if (selectedMarkerPlaceId === null) return filteredPlaces;
    return filteredPlaces.filter((place) => place.placeId === selectedMarkerPlaceId);
  }, [filteredPlaces, selectedMarkerPlaceId]);

  useEffect(() => {
    if (selectedMarkerPlaceId === null) return;

    const exists = filteredPlaces.some((place) => place.placeId === selectedMarkerPlaceId);
    if (!exists) {
      setSelectedMarkerPlaceId(null);
    }
  }, [filteredPlaces, selectedMarkerPlaceId]);

  const handleEditProfile = () => {
    router.push('/mypage/edit-profile');
  };

  const handleShareInfo = () => {
    router.push('/editor/register-place');
  };

  if (isPlaceListLoading) {
    return <LoadingPage text="내 장소를 불러오는 중입니다." role="EDITOR" />;
  }

  if (isPlaceListError) {
    return <div className="px-5 pt-6">불러오기 실패</div>;
  }

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="pt-3 pb-6">
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
