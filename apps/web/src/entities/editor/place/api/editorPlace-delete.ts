import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';
import { clientApi } from '@/shared/lib/api/client';
import { ApiResponse } from '@/shared/lib/api/common';

export const editorPlaceDelete = {
  deletePlace: async (placeId: number): Promise<ApiResponse<null>> => {
    const response = await clientApi
      .delete(`${EDITOR_ENDPOINTS.me.postsDetail(placeId)}`)
      .json<ApiResponse<null>>();
    return response;
  },
};
