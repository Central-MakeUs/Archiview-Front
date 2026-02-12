import { clientApi } from '@/shared/lib/api/client';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import { IPostPlaceRequest, IIPostPlaceResponseDTO } from '../model/archiverPlace.type';

export const archiverPlacePost = {
  postPlaceCard: async ({ postPlaceId }: IPostPlaceRequest): Promise<IIPostPlaceResponseDTO> => {
    const response = await clientApi
      .post(`${ARCHIVER_ENDPOINTS.archives.postPlaces(postPlaceId)}`)
      .json<IIPostPlaceResponseDTO>();
    return response;
  },
};
