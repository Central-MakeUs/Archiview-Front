import { clientApi } from '@/shared/lib/api/client';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';
import { ApiResponse } from '@/shared/lib/api/common';

export const archiverSearchDelete = {
  deleteRecent: async (historyId: number) => {
    const response = await clientApi
      .delete(`${ARCHIVER_ENDPOINTS.archivers.search.delete(historyId)}`)
      .json<ApiResponse<null>>();
    return response;
  },
};
