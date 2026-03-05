import { clientApi, unauthClientApi } from '@/shared/lib/api/client';
import { AUTH_ENDPOINTS } from '@/shared/constants/endpoints/auth/AuthEndpoints';

import {
  IAppleMobileLoginRequestDTO,
  IAppleMobileLoginResponseDTO,
  IKakaoMobileLoginRequestDTO,
  IKakaoMobileLoginResponseDTO,
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

  // 모바일 애플 로그인
  mobileAppleLogin: async (
    payload: IAppleMobileLoginRequestDTO,
  ): Promise<IAppleMobileLoginResponseDTO> => {
    const response = await unauthClientApi
      .post(`${AUTH_ENDPOINTS.mobile.apple}`, { json: payload })
      .json<IAppleMobileLoginResponseDTO>();

    return response;
  },

  // 모바일 카카오 로그인
  mobileKakaoLogin: async (
    payload: IKakaoMobileLoginRequestDTO,
  ): Promise<IKakaoMobileLoginResponseDTO> => {
    const response = await unauthClientApi
      .post(`${AUTH_ENDPOINTS.mobile.kakao}`, { json: payload })
      .json<IKakaoMobileLoginResponseDTO>();

    return response;
  },
};
