import { ApiResponse } from '@/shared/lib/api/common';

type Role = 'EDITOR' | 'ARCHIVER' | 'GUEST';
export interface IRegisterRequestDTO {
  role: Role;
}

export interface IUserType {
  role: Role;
  provider: string;
  name: string;
  userId: string;
  email: string;
}

export interface ISwitchRoleResponse {
  accessToken: string;
  role: Role;
}

export interface IEditorProfileRegisterRequest {
  profileImageUrl: string;
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
}

export interface IEditorProfileRegisterResponse {
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
}

export type IRegisterResponeDTO = ApiResponse<Record<string, never>>;

// 현재 사용자 조회
export type IUserResponseDTO = ApiResponse<IUserType>;

// 로그아웃
export type ILogoutResponseDTO = ApiResponse<Record<string, never>>;

// 역할 바꾸기
export type ISwitchRoleResponseDTO = ApiResponse<ISwitchRoleResponse>;

// 에디터 프로필 등록
export type IEditorProfileRegisterResponseDTO = ApiResponse<IEditorProfileRegisterResponse>;
