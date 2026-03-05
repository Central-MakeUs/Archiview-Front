'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Cookies from 'js-cookie';

import { COOKIE_KEYS } from '@/shared/constants/cookies';
import { ExtendedKyHttpError } from '@/shared/lib/api/common';

import { authDelete } from '../api/auth-delete';

export const useWithdraw = () => {
  const router = useRouter();

  const { mutate: withdraw } = useMutation({
    mutationFn: authDelete.withDraw,
    onSuccess: () => {
      Cookies.remove(COOKIE_KEYS.accessToken, { path: '/' });
      Cookies.remove(COOKIE_KEYS.role, { path: '/' });
      toast.success('회원탈퇴가 완료되었습니다.');
      router.push('/login');
    },
    onError: (error: ExtendedKyHttpError) => {
      toast.error(error.errorData?.message ?? error.message ?? '알 수 없는 오류');
    },
  });

  return { withdraw };
};
