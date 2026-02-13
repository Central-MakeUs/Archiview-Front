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
};
