import { clientApi } from '@/shared/lib/api/client';
import { AUTH_ENDPOINTS } from '@/shared/constants/endpoints/auth/AuthEndpoints';

import {
  IRegisterRequestDTO,
  IRegisterResponeDTO,
  ISwitchRoleResponseDTO,
  IEditorProfileRegisterRequest,
  IEditorProfileRegisterResponseDTO,
} from '../model/auth.type';

export const authPost = {
  // 회원가입 (온보딩 완료)
  register: async ({ role }: IRegisterRequestDTO): Promise<IRegisterResponeDTO> => {
    const response = await clientApi
      .post(`${AUTH_ENDPOINTS.users.onboarding}`, { json: { role } })
      .json<IRegisterResponeDTO>();

    return response;
  },

  // 역할 변경
  changeRole: async ({ role }: IRegisterRequestDTO): Promise<ISwitchRoleResponseDTO> => {
    const response = await clientApi
      .post(`${AUTH_ENDPOINTS.users.switchRole}`, { json: { role } })
      .json<ISwitchRoleResponseDTO>();

    return response;
  },

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
      .post(`${AUTH_ENDPOINTS.users.onboarding}`, {
        json: { profileImageUrl, nickname, instagramId, instagramUrl, introduction, hashtags },
      })
      .json<IEditorProfileRegisterResponseDTO>();

    return response;
  },
};
