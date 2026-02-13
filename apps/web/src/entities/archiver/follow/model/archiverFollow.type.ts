import { ApiResponse } from '@/shared/lib/api/common';

export interface IFollowRequest {
  editorId: string;
}

export type IFollowResponseDTO = ApiResponse<Record<string, never>>;
