import { clientApi } from '@/shared/lib/api/client';

import type { IBlockedEditorListResponseDTO } from '../model/archiverFollow.type';

export const archiverFollowGet = {
  getBlockedEditors: async (params: { useMock?: boolean }): Promise<IBlockedEditorListResponseDTO> => {
    const response = await clientApi
      .get(`archivers/blocks`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IBlockedEditorListResponseDTO>();
    return response;
  },
};
