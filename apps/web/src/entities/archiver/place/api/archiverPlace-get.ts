import { clientApi } from '@/shared/lib/api/client';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import {
  IPlaceDetailResponseDTO,
  IHotPlaceResponseDTO,
  IArchivePlacesResponseDTO,
  IArchivePinsResponseDTO,
  INearPlaceResponseDTO,
} from '../model/archiverPlace.type';

export const archiverPlaceGet = {
  // 장소 상세 조회
  getPlaceDetail: async (params: {
    placeId: number;
    useMock?: boolean;
  }): Promise<IPlaceDetailResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.places.placeDetail(params.placeId)}`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IPlaceDetailResponseDTO>();
    return response;
  },

  // 요즘 핫한 장소 조회
  getHotPlaces: async (params: {
    size?: number;
    useMock?: boolean;
  }): Promise<IHotPlaceResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.places.hot}`, {
        searchParams: { size: params?.size ?? 10, useMock: params?.useMock ?? false },
      })
      .json<IHotPlaceResponseDTO>();
    return response;
  },

  // 아카이브한 장소카드 목록 조회
  getArchivePlaces: async (params: { useMock?: boolean }): Promise<IArchivePlacesResponseDTO> => {
    const response = await clientApi
      .get(`archivers/archives/post-places`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IArchivePlacesResponseDTO>();
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
    const searchParams = new URLSearchParams();

    searchParams.set('filter', filter);
    searchParams.set('useMock', String(params?.useMock ?? false));

    if (filter === 'NEARBY') {
      if (Number.isFinite(params?.latitude)) {
        searchParams.set('latitude', String(params.latitude));
      }

      if (Number.isFinite(params?.longitude)) {
        searchParams.set('longitude', String(params.longitude));
      }
    }

    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.archives.map.places}`, {
        searchParams,
      })
      .json<IArchivePinsResponseDTO>();

    return response;
  },

  // 내 주변 1km 장소 조회
  getNearbyPlaces: async (params: {
    latitude: number;
    longitude: number;
    useMock?: boolean;
  }): Promise<INearPlaceResponseDTO> => {
    const response = await clientApi
      .get(`archivers/places/nearby`, {
        searchParams: {
          latitude: params.latitude,
          longitude: params.longitude,
          useMock: params.useMock ?? false,
        },
      })
      .json<INearPlaceResponseDTO>();

    return response;
  },

  getEditorPlace: async (params: {
    userId: string;
    placeId: number;
    useMock?: boolean;
  }): Promise<IPlaceDetailResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.archivers.editors.editorPlace(params.userId, params.placeId)}`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IPlaceDetailResponseDTO>();
    return response;
  },
};
