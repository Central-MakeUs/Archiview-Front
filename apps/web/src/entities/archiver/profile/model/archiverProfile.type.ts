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

export interface IMyFollowsResponse {
  editors: IEditor[];
}

export interface IEditorsTrustedResponse {
  places: IPlace[];
}

export interface IMyProfileResponse {
  userId: string;
  nickname: string;
  profileImageUrl: string;
}

// 내 프로필 조회(아카이버) API DTO
export type IArchiverMyProfileResponseDTO = ApiResponse<IMyProfileResponse>;

// 내 팔로우 목록 (내가 팔로잉하는 목록)
export type IMyFollowsResponseDTO = ApiResponse<IMyFollowsResponse>;

// 믿고 먹는 에디터 조회
export type IEditorsTrustedResponseDTO = ApiResponse<IEditorsTrustedResponse>;
