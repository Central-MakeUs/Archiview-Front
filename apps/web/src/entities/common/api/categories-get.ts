'use client';
import { COMMON_ENDPOINTS } from '@/shared/constants/endpoints/common/CommonEndpoints';
import { clientApi } from '@/shared/lib/api/client';

import { ICategoriesResponseDTO } from '../model/common.type';

export const getCategories = async (): Promise<ICategoriesResponseDTO> => {
  const response = await clientApi.get(COMMON_ENDPOINTS.categories).json<ICategoriesResponseDTO>();
  return response;
};
