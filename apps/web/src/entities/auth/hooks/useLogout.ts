'use client';

import { useMutation } from '@tanstack/react-query';
import { authPost } from '../api/auth-post';
import Cookies from 'js-cookie';

import { COOKIE_KEYS } from '@/shared/constants/cookies';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ExtendedKyHttpError } from '@/shared/lib/api/common';

export const useLogout = () => {
  const router = useRouter();
  const { mutate: logout } = useMutation({
    mutationFn: authPost.logout,
    onSuccess: () => {
      Cookies.remove(COOKIE_KEYS.accessToken, { path: '/' });
      Cookies.remove(COOKIE_KEYS.role, { path: '/' });
      router.push('/login');
    },
    onError: (error: ExtendedKyHttpError) => {
      toast.error(error.errorData?.message ?? error.message ?? '알 수 없는 오류');
    },
  });

  return { logout };
};
