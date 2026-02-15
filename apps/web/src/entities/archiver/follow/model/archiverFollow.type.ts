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

export interface IBlockedEditorResponse {
  totalCount: number;
  editors: IBlockedEditor[];
}

export type IFollowResponseDTO = ApiResponse<Record<string, never>>;

// 차단한 에디터 목록
export type IBlockedEditorResponseDTO = ApiResponse<IBlockedEditorResponse>;
