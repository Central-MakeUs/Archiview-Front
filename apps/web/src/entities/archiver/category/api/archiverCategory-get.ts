import { clientApi } from '@/shared/lib/api/client';

import { ICategoryPlaceListResponseDTO } from '../model/archiverCategory.type';

export const archiverCategoryGet = {
  getCategoryPlaceList: async (params: {
    categoryId: number;
    useMock?: boolean;
  }): Promise<ICategoryPlaceListResponseDTO> => {
    const response = await clientApi
      .get(`category/${params.categoryId}/places`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<ICategoryPlaceListResponseDTO>();
    return response;
  },
};
