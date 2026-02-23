import { clientApi } from '@/shared/lib/api/client';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import {
  IPostPlaceRequest,
  IIPostPlaceResponseDTO,
  IInstagramFlowResponseDTO,
  IDirectionFlowResponseDTO,
} from '../model/archiverPlace.type';

export const archiverPlacePost = {
  postPlaceCard: async ({ postPlaceId }: IPostPlaceRequest): Promise<IIPostPlaceResponseDTO> => {
    const response = await clientApi
      .post(`${ARCHIVER_ENDPOINTS.archives.postPlaces(postPlaceId)}`)
      .json<IIPostPlaceResponseDTO>();
    return response;
  },

  postInstagramFlow: async ({
    postPlaceId,
  }: IPostPlaceRequest): Promise<IInstagramFlowResponseDTO> => {
    const response = await clientApi
      .post(`${ARCHIVER_ENDPOINTS.archivers.postPlaces.instagramFlow(postPlaceId)}`)
      .json<IInstagramFlowResponseDTO>();
    return response;
  },

  postDirectionFlow: async ({
    postPlaceId,
  }: IPostPlaceRequest): Promise<IDirectionFlowResponseDTO> => {
    const response = await clientApi
      .post(`${ARCHIVER_ENDPOINTS.archivers.postPlaces.directionFlow(postPlaceId)}`)
      .json<IDirectionFlowResponseDTO>();
    return response;
  },
};
