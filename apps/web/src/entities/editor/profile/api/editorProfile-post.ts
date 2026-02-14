import { clientApi } from '@/shared/lib/api/client';

import {
  IEditorProfileRegisterRequest,
  IEditorProfileRegisterResponseDTO,
} from '@/entities/auth/model/auth.type';
import { AUTH_ENDPOINTS } from '@/shared/constants/endpoints/auth/AuthEndpoints';

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
      .post(`${AUTH_ENDPOINTS.users.me.editorProfile}`, {
        json: { profileImageUrl, nickname, instagramId, instagramUrl, introduction, hashtags },
      })
      .json<IEditorProfileRegisterResponseDTO>();

    return response;
  },
};
