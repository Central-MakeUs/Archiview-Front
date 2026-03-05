'use client';

import { useMutation } from '@tanstack/react-query';

import { authPost } from '../api/auth-post';
import type { IAppleMobileLoginRequestDTO } from '../model/auth.type';

export const useAppleMobileLogin = () => {
  return useMutation({
    mutationFn: (payload: IAppleMobileLoginRequestDTO) => authPost.mobileAppleLogin(payload),
  });
};
