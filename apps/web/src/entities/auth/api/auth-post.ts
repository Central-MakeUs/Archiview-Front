import { clientApi } from '@/shared/lib/api/client';
import { AUTH_ENDPOINTS } from '@/shared/constants/endpoints/auth/AuthEndpoints';

import { IRegisterRequestDTO, IRegisterResponeDTO } from '../model/auth.type';

export const authPost = {
  // 회원가입 (온보딩 완료)
  register: async ({ role }: IRegisterRequestDTO): Promise<IRegisterResponeDTO> => {
    const response = await clientApi
      .post(`${AUTH_ENDPOINTS.users.onboarding}`, { json: { role } })
      .json<IRegisterResponeDTO>();

    return response;
  },
};
