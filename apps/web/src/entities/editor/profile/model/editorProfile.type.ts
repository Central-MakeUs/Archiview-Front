import { ApiResponse } from '@/shared/lib/api/common';

export interface IPlaceInfo {
  placeId: number;
  name: string;
  roadAddress: string;
  detailAddress: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface IEditorMeProfileResponse {
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
}

export interface IEditorPublicProfileResponse {
  postId: number;
  url: string;
  hashTag: string;
  placeInfoResponseList: IPlaceInfo[];
}

// 에디터용 프로필 업데이트
export interface IEditorProfileEditRequestDTO {
  nickname: string;
  instagramId: string;
  bio: string;
  profileImageUrl: string;
}

// 에디터 자신의 프로필 정보 조회
export type IEditorMeProfileResponseDTO = ApiResponse<IEditorMeProfileResponse>;

// 특정 에디터의 공개된 프로필 정보 조회
export type IEditorPublicProfileResponseDTO = ApiResponse<IEditorPublicProfileResponse>;
