'use client';

import { useMutation } from '@tanstack/react-query';
import { authPost } from '../api/auth-post';
import { LOCAL_STORAGE_KEYS } from '@/shared/constants/localStorageKeys';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ExtendedKyHttpError } from '@/shared/lib/api/common';

export const useLogout = () => {
  const router = useRouter();
  const { mutate: logout } = useMutation({
    mutationFn: authPost.logout,
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.role);
      router.push('/login');
    },
    onError: (error: ExtendedKyHttpError) => {
      toast.error(error.errorData?.message ?? error.message ?? '알 수 없는 오류');
    },
  });

  return { logout };
};
