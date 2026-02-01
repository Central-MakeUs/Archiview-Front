import { clientApi } from '@/shared/lib/api/client';
import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';

import type {
  IEditorMeProfileResponseDTO,
  IEditorPublicProfileResponseDTO,
} from '../model/editorProfile.type';

export const editorProfileGet = {
  /**
   * 내(로그인한) 에디터 프로필 조회
   */
  getEditorMeProfile: async (): Promise<IEditorMeProfileResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.profile}`)
      .json<IEditorMeProfileResponseDTO>();

    return response;
  },

  /**
   * 특정 에디터 공개 프로필 조회
   */
  getEditorPublicProfile: async (editorId: number): Promise<IEditorPublicProfileResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.publicProfile}`)
      .json<IEditorPublicProfileResponseDTO>();

    return response;
  },
};
