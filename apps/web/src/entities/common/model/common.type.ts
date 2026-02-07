import { ApiResponse } from '@/shared/lib/api/common';

export interface ICategories {
  id: number;
  name: string;
}

export interface ICategoriesResponse {
  categories: ICategories[];
}

export type ICategoriesResponseDTO = ApiResponse<ICategoriesResponse>;
