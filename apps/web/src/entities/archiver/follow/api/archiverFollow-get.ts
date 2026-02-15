import { clientApi } from '@/shared/lib/api/client';

import type { IBlockedEditorResponseDTO } from '../model/archiverFollow.type';

export const archiverFollowGet = {
  getBlockedEditors: async (params: { useMock?: boolean }): Promise<IBlockedEditorResponseDTO> => {
    const response = await clientApi
      .get(`archivers/blocks`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IBlockedEditorResponseDTO>();
    return response;
  },
};
