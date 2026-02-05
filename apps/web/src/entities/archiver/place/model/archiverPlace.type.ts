import type { ApiResponse } from '@/shared/lib/api/common';

export interface IPlaceDetail {
  placeId: number;
  name: string;
  roadAddress: string;
  detailAddress: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  nearestStationWalkTime: string;
  viewCount: number;
}

export interface IPostPlace {
  postPlaceId: number;
  postId: number;
  instagramUrl: string;
  hashTags: string[];
  description: string;
  imageUrl: string;
  categoryNames: string[];
}

export interface IPlaceDetailResponse {
  places: IPlaceDetail[];
  postPlaces: IPostPlace[];
}

export interface IHotPlace {
  placeId: number;
  name: string;
  imageUrl: string;
  categoryNames: string[];
  hashTags: string[];
  viewCount: number;
}

export interface IHotPlaceResponse {
  places: IHotPlace[];
}

// 장소 상세 조회
export type IPlaceDetailResponseDTO = ApiResponse<IPlaceDetailResponse>;

// 요즘 핫한 장소 조회
export type IHotPlaceResponseDTO = ApiResponse<IHotPlaceResponse>;
