import type { ApiResponse } from '@/shared/lib/api/common';

export interface IStats {
  saveCount: number;
  viewCount: number;
  instagramInflowCount: number;
  directionCount: number;
}

export interface IPlace {
  placeId: number;
  placeName: string;
  placeImageUrl: string;
  editorSummary: string;
  stats: IStats;
}

export interface IEditor {
  editorId: string;
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
}

export interface IEditorProfile {
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
}

export interface IEditorPlace {
  postPlaceId: number;
  placeName: string;
  description: string;
  saveCount: number;
  viewCount: number;
  lastModifiedAt: string;
  imageUrl: string;
}

export interface IMyFollowsResponse {
  editors: IEditor[];
}

export interface IEditorsTrustedResponse {
  editors: IEditor[];
}

export interface IMyProfileResponse {
  userId: string;
  nickname: string;
  profileImageUrl: string;
}

export interface IEditorPlaceResposne {
  postPlaces: IEditorPlace[];
}

// 내 프로필 조회(아카이버) API DTO
export type IArchiverMyProfileResponseDTO = ApiResponse<IMyProfileResponse>;

// 내 팔로우 목록 (내가 팔로잉하는 목록)
export type IMyFollowsResponseDTO = ApiResponse<IMyFollowsResponse>;

// 믿고 먹는 에디터 조회
export type IEditorsTrustedResponseDTO = ApiResponse<IEditorsTrustedResponse>;

// 에디터 프로필 조회
export type IEditorProfileResponseDTO = ApiResponse<IEditorProfile>;

// 에디터가 업로드한 장소 목록 조회
export type IEditorPlaceResposneDTO = ApiResponse<IEditorPlaceResposne>;
