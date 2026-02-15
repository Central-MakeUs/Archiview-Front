import { ApiResponse } from '@/shared/lib/api/common';

export interface IPlace {
  placeId: number;
  placeName: string;
  latestDescription: string;
  viewCount: number;
  saveCount: number;
}

export interface ICategoryPlaceList {
  totalCount: number;
  places: IPlace[];
}

export type ICategoryPlaceListResponseDTO = ApiResponse<ICategoryPlaceList>;
