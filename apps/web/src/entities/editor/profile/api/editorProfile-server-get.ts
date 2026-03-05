import 'server-only';

import { serverApi } from '@/shared/lib/api/server';
import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';

import type { IEditorMeProfileResponseDTO } from '../model/editorProfile.type';

export const editorProfileServerGet = {
  getEditorMeProfile: async (): Promise<IEditorMeProfileResponseDTO> => {
    const response = await serverApi.get<IEditorMeProfileResponseDTO>(
      EDITOR_ENDPOINTS.me.profile,
    );
    return response;
  },
};
