import 'server-only';

import { serverApi } from '@/shared/lib/api/server';

import type { ICategoryPlaceListResponseDTO } from '../model/archiverCategory.type';

export const archiverCategoryServerGet = {
  getCategoryPlaceList: async (params: {
    categoryId: number;
    useMock?: boolean;
  }): Promise<ICategoryPlaceListResponseDTO> => {
    const response = await serverApi.get<ICategoryPlaceListResponseDTO>(
      `categories/${params.categoryId}/places`,
      { searchParams: { useMock: params?.useMock ?? false } },
    );
    return response;
  },
};
