import { clientApi } from '@/shared/lib/api/client';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import { IDeletePlaceResponseDTO } from '../model/archiverPlace.type';

export const archiverPlaceDelete = {
  // 아카이브 장소카드 해제
  deletePlace: async (params: { postPlaceId: number }): Promise<IDeletePlaceResponseDTO> => {
    const response = await clientApi
      .delete(`${ARCHIVER_ENDPOINTS.archives.postPlaces(params.postPlaceId)}`)
      .json<IDeletePlaceResponseDTO>();
    return response;
  },
};
