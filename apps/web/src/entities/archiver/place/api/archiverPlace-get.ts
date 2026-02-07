import { clientApi } from '@/shared/lib/api/client';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import { IPlaceDetailResponseDTO, IHotPlaceResponseDTO } from '../model/archiverPlace.type';

export const archiverPlaceGet = {
  getPlaceDetail: async (params: {
    placeId: number;
    useMock?: boolean;
  }): Promise<IPlaceDetailResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.places.placeDetail}`, {
        searchParams: { placeId: params.placeId, useMock: params?.useMock ?? false },
      })
      .json<IPlaceDetailResponseDTO>();
    return response;
  },

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
};
