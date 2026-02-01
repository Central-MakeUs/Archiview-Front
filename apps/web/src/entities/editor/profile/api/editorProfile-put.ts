import { clientApi } from '@/shared/lib/api/client';
import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';

import type { IEditorProfileEditRequestDTO } from '../model/editorProfile.type';

export const editorProfilePut = {
  putMyProfile: async (): Promise<IEditorProfileEditRequestDTO> => {
    const response = await clientApi
      .put(`${EDITOR_ENDPOINTS.me.profile}`)
      .json<IEditorProfileEditRequestDTO>();

    return response;
  },
};
