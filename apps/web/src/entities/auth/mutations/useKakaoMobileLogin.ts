'use client';

import { useMutation } from '@tanstack/react-query';

import { authPost } from '../api/auth-post';
import type { IKakaoMobileLoginRequestDTO } from '../model/auth.type';

export const useKakaoMobileLogin = () => {
  return useMutation({
    mutationFn: (payload: IKakaoMobileLoginRequestDTO) => authPost.mobileKakaoLogin(payload),
  });
};
