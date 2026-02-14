import { clientApi } from '@/shared/lib/api/client';
import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';

import {
  IEditorProfileRegisterRequest,
  IEditorProfileRegisterResponseDTO,
} from '@/entities/auth/model/auth.type';

export const editorProfilePost = {
    // 에디터 프로필 등록
  registerEditorProfile: async ({
    profileImageUrl,
    nickname,
    instagramId,
    instagramUrl,
    introduction,
    hashtags,
  }: IEditorProfileRegisterRequest): Promise<IEditorProfileRegisterResponseDTO> => {
    const response = await clientApi
      .post(`${EDITOR_ENDPOINTS.me.profile}`, {
        json: { profileImageUrl, nickname, instagramId, instagramUrl, introduction, hashtags },
      })
      .json<IEditorProfileRegisterResponseDTO>();

    return response;
  },
};
