import { ApiResponse } from '@/shared/lib/api/common';

export interface ICategoriesResponse {
  id: number;
  name: string;
}

export type ICategoriesResponseDTO = ApiResponse<ICategoriesResponse>;
