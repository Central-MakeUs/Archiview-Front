import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';
import { clientApi } from '@/shared/lib/api/client';
import {
  IRecentResponseDTO,
  IRecommendationsResponseDTO,
  ISearchResponseDTO,
} from '../model/archiverSearch.type';

export const archiverSearchGet = {
  getSearch: async (params: { search: string }): Promise<ISearchResponseDTO> => {
    const response = await clientApi
      .get(ARCHIVER_ENDPOINTS.archivers.search.search(params.search))
      .json<ISearchResponseDTO>();
    return response;
  },

  getRecent: async (): Promise<IRecentResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.archivers.search.recent}`)
      .json<IRecentResponseDTO>();
    return response;
  },

  getRecommendations: async (): Promise<IRecommendationsResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.archivers.search.recommendations}`)
      .json<IRecommendationsResponseDTO>();
    return response;
  },
};
