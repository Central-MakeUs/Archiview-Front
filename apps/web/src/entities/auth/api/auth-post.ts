import { clientApi } from '@/shared/lib/api/client';
import { AUTH_ENDPOINTS } from '@/shared/constants/endpoints/auth/AuthEndpoints';

import {
  IRegisterRequestDTO,
  IRegisterResponeDTO,
  ISwitchRoleResponseDTO,
} from '../model/auth.type';
import { ApiResponse } from '@/shared/lib/api/common';

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

  // 로그아웃
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await clientApi.post(`${AUTH_ENDPOINTS.logout}`).json<ApiResponse<null>>();

    return response;
  },
};
