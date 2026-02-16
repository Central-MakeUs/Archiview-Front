import { clientApi } from '@/shared/lib/api/client';

import type { IFollowResponseDTO, IBlockEditorResponseDTO } from '../model/archiverFollow.type';

export const archiverFollowPost = {
  followEditor: async (editorId: string): Promise<IFollowResponseDTO> => {
    const response = await clientApi
      .post(`archivers/follows/${editorId}`)
      .json<IFollowResponseDTO>();
    return response;
  },

  // 에디터 차단
  blockEditor: async (editorId: string): Promise<IBlockEditorResponseDTO> => {
    const response = await clientApi
      .post(`archivers/blocks/editors/${editorId}`)
      .json<IBlockEditorResponseDTO>();
    return response;
  },
};
