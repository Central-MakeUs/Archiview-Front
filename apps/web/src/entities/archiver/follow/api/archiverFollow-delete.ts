import { clientApi } from '@/shared/lib/api/client';

import type { IFollowResponseDTO } from '../model/archiverFollow.type';

export const archiverFollowDelete = {
  unFollowEditor: async (editorId: string): Promise<IFollowResponseDTO> => {
    const response = await clientApi
      .delete(`archivers/follows/${editorId}`)
      .json<IFollowResponseDTO>();
    return response;
  },
};
