import { ApiResponse } from '@/shared/lib/api/common';

export interface IFollowRequest {
  editorId: string;
}

export interface IBlockedEditor {
  editorId: string;
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
  blockedAt: string;
}

export interface IBlockedEditorListResponse {
  totalCount: number;
  editors: IBlockedEditor[];
}

export type IFollowResponseDTO = ApiResponse<Record<string, never>>;

// 에디터 차단
export type IBlockEditorResponseDTO = ApiResponse<Record<string, never>>;

// 차단한 에디터 목록
export type IBlockedEditorListResponseDTO = ApiResponse<IBlockedEditorListResponse>;

// 에디터 차단 해제
export type IUnBlockEditorResponseDTO = ApiResponse<Record<string, never>>;
