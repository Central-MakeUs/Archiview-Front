import 'server-only';

import { serverApi } from '@/shared/lib/api/server';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import type {
  IPlaceDetailResponseDTO,
  IHotPlaceResponseDTO,
  IArchivePlacesResponseDTO,
  IArchivePinsResponseDTO,
  INearPlaceResponseDTO,
} from '../model/archiverPlace.type';

export const archiverPlaceServerGet = {
  // 장소 상세 조회
  getPlaceDetail: async (params: {
    placeId: number;
    useMock?: boolean;
  }): Promise<IPlaceDetailResponseDTO> => {
    const response = await serverApi.get<IPlaceDetailResponseDTO>(
      ARCHIVER_ENDPOINTS.places.placeDetail(params.placeId),
      { searchParams: { useMock: params?.useMock ?? false } },
    );
    return response;
  },

  // 요즘 핫한 장소 조회
  getHotPlaces: async (params: {
    size?: number;
    useMock?: boolean;
  }): Promise<IHotPlaceResponseDTO> => {
    const response = await serverApi.get<IHotPlaceResponseDTO>(
      ARCHIVER_ENDPOINTS.places.hot,
      { searchParams: { size: params.size, useMock: params?.useMock ?? false } },
    );
    return response;
  },

  // 아카이브한 장소카드 목록 조회
  getArchivePlaces: async (params: {
    useMock?: boolean;
  }): Promise<IArchivePlacesResponseDTO> => {
    const response = await serverApi.get<IArchivePlacesResponseDTO>(
      'archivers/archives/post-places',
      { searchParams: { useMock: params?.useMock ?? false } },
    );
    return response;
  },

  // 아카이브한 장소 핀 지도 조회
  getArchivePins: async (params: {
    filter?: 'ALL' | 'NEARBY';
    latitude?: number;
    longitude?: number;
    useMock?: boolean;
  }): Promise<IArchivePinsResponseDTO> => {
    const filter = params?.filter ?? 'ALL';
    const searchParams: Record<string, string | number | boolean | undefined> = {
      filter,
      useMock: params?.useMock ?? false,
    };

    if (filter === 'NEARBY') {
      if (Number.isFinite(params?.latitude)) {
        searchParams.latitude = params.latitude;
      }
      if (Number.isFinite(params?.longitude)) {
        searchParams.longitude = params.longitude;
      }
    }

    const response = await serverApi.get<IArchivePinsResponseDTO>(
      ARCHIVER_ENDPOINTS.archives.map.places,
      { searchParams },
    );
    return response;
  },

  // 내 주변 1km 장소 조회
  getNearbyPlaces: async (params: {
    latitude: number;
    longitude: number;
    useMock?: boolean;
  }): Promise<INearPlaceResponseDTO> => {
    const response = await serverApi.get<INearPlaceResponseDTO>(
      'archivers/places/nearby',
      {
        searchParams: {
          latitude: params.latitude,
          longitude: params.longitude,
          useMock: params.useMock ?? false,
        },
      },
    );
    return response;
  },

  getEditorPlace: async (params: {
    userId: string;
    placeId: number;
    useMock?: boolean;
  }): Promise<IPlaceDetailResponseDTO> => {
    const response = await serverApi.get<IPlaceDetailResponseDTO>(
      ARCHIVER_ENDPOINTS.archivers.editors.editorPlace(params.userId, params.placeId),
      { searchParams: { useMock: params?.useMock ?? false } },
    );
    return response;
  },
};
