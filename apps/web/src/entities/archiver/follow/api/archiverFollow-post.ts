import { clientApi } from '@/shared/lib/api/client';

import type { IFollowResponseDTO } from '../model/archiverFollow.type';

export const archiverFollowPost = {
  followEditor: async (editorId: string): Promise<IFollowResponseDTO> => {
    const response = await clientApi
      .post(`archivers/follows`, { json: { editorId } })
      .json<IFollowResponseDTO>();
    return response;
  },
};
