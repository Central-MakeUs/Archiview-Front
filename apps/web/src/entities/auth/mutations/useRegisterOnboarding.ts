'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authGet } from '@/entities/auth/api/auth-get';
import { authPost } from '@/entities/auth/api/auth-post';
import { LOCAL_STORAGE_KEYS } from '@/shared/constants/localStorageKeys';
import { authKeys } from '@/shared/lib/query-keys';

import type { IRegisterRequestDTO } from '../model/auth.type';

type Result = {
  role: IRegisterRequestDTO['role'];
};

export const useRegisterOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IRegisterRequestDTO): Promise<Result> => {
      const persistRole = (role: IRegisterRequestDTO['role']) => {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEYS.role, role);
        } catch (e) {
          console.error('Failed to write role to localStorage', e);
        }
      };

      await authPost.register(payload);

      await queryClient.invalidateQueries({ queryKey: authKeys.getMyInfo.all.queryKey });

      try {
        const me = await queryClient.fetchQuery({
          queryKey: authKeys.getMyInfo.all.queryKey,
          queryFn: () => authGet.getMyInfo(),
        });

        const nextRole = me.data?.role;

        persistRole(nextRole ?? payload.role);

        return { role: nextRole ?? payload.role };
      } catch (e) {
        persistRole(payload.role);
      }

      return { role: payload.role };
    },
  });
};
