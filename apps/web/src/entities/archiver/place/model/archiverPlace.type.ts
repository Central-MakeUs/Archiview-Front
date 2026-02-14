import type { ApiResponse } from '@/shared/lib/api/common';

export interface IPlaceDetail {
  placeId: number;
  name: string;
  placeUrl: string;
  phoneNumber: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
  nearestStationWalkTime: string;
  viewCount: number;
  saveCount: number;
  instagramInflowCount: number;
  directionCount: number;
}

export interface IPostPlace {
  postPlaceId: number;
  postId: number;
  instagramUrl: string;
  hashTags: string[];
  description: string;
  imageUrl: string;
  categoryNames: string[];
  editorName: string;
  editorInstagramId: string;
  isArchived: boolean;
}

export interface IPlaceDetailResponse {
  place: IPlaceDetail;
  postPlaces: IPostPlace[];
}

export interface IHotPlace {
  placeId: number;
  name: string;
  placeUrl: string;
  address: string;
  imageUrl: string;
  categoryNames: string[];
  hashTags: string[];
  viewCount: number;
}

export interface IArchivePlace {
  postPlaceId: number;
  placeId: number;
  placeName: string;
  description: string;
  imageUrl: string;
  saveCount: number;
  viewCount: number;
  lastModifiedAt: string;
  archivedAt: string;
}

export interface IPin {
  placeId: number;
  name: string;
  placeUrl: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  categories: string[];
}

export interface INearPlace {
  placeId: number;
  placeName: string;
  latestDescription: string;
  viewCount: number;
  saveCount: number;
}

export interface IPostPlaceRequest {
  postPlaceId: number;
}

export interface IDeletePlaceRequest {
  postPlaceId: number;
}

export interface IHotPlaceResponse {
  places: IHotPlace[];
}

export interface IArchivePlacesResponse {
  totalCount: number;
  postPlaces: IArchivePlace[];
}

export interface IArchivePinsResponse {
  pins: IPin[];
}

export interface INearPlaceResponse {
  places: INearPlace[];
}

// 장소 상세 조회
export type IPlaceDetailResponseDTO = ApiResponse<IPlaceDetailResponse>;

// 요즘 핫한 장소 조회
export type IHotPlaceResponseDTO = ApiResponse<IHotPlaceResponse>;

// 장소카드 아카이브
export type IIPostPlaceResponseDTO = ApiResponse<Record<string, never>>;

// 아카이브한 장소카드 목록 조회
export type IArchivePlacesResponseDTO = ApiResponse<IArchivePlacesResponse>;

// 아카이브한 장소 핀 지도 조회
export type IArchivePinsResponseDTO = ApiResponse<IArchivePinsResponse>;

// 내 주변 1km 장소 조회
export type INearPlaceResponseDTO = ApiResponse<INearPlaceResponse>;

// 아카이브 장소카드 해제
export type IDeletePlaceResponseDTO = ApiResponse<Record<string, never>>;
