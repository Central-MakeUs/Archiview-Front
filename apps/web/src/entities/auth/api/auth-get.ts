import { clientApi } from '@/shared/lib/api/client';
import { AUTH_ENDPOINTS } from '@/shared/constants/endpoints/auth/AuthEndpoints';

import type { IUserResponseDTO } from '../model/auth.type';

export const authGet = {
  // 현재 사용자 조회
  getMyInfo: async (): Promise<IUserResponseDTO> => {
    const response = await clientApi.get(`${AUTH_ENDPOINTS.me}`).json<IUserResponseDTO>();

    return response;
  },
};
