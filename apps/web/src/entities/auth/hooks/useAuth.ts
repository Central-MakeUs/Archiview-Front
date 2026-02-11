'use client';
import type { HTTPError } from 'ky';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOCAL_STORAGE_KEYS } from '@/shared/constants/localStorageKeys';
import { authKeys } from '@/shared/lib/query-keys';

import { useAccessToken } from './useAccessToken';
import { useSaveRole } from './useSaveRole';
import { authPost } from '../api/auth-post';
import type { IRegisterRequestDTO } from '../model/auth.type';

export class SwitchRoleError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'SwitchRoleError';
  }
}

type SwitchableRole = Exclude<IRegisterRequestDTO['role'], 'GUEST'>;

const getNextRole = (role: string | null): SwitchableRole | null => {
  if (role === 'ARCHIVER') return 'EDITOR';
  if (role === 'EDITOR') return 'ARCHIVER';
  return null;
};

export const useAuth = () => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const hasAccessTokenInQuery = useMemo(() => !!searchParams?.get('accessToken'), [searchParams]);

  useAccessToken({
    storageKey: LOCAL_STORAGE_KEYS.accessToken,
    queryKey: 'accessToken',
  });

  const authQuery = useSaveRole({
    enabled: hasAccessTokenInQuery,
  });

  const changeRoleMutation = useMutation({
    mutationFn: ({ role }: { role: SwitchableRole }) => authPost.changeRole({ role }),
    onSuccess: (response) => {
      // 성공일 때만 저장
      const nextRole = response.data?.role;
      const nextAccessToken = response.data?.accessToken;

      if (nextRole) localStorage.setItem(LOCAL_STORAGE_KEYS.role, nextRole);
      if (nextAccessToken) localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, nextAccessToken);

      queryClient
        .invalidateQueries({ queryKey: authKeys.getMyInfo.all.queryKey })
        .catch(console.error);
    },
  });

  const switchRole = async (): Promise<SwitchableRole> => {
    const currentRole = localStorage.getItem(LOCAL_STORAGE_KEYS.role);
    const nextRole = getNextRole(currentRole);

    if (!nextRole)
      throw new Error(`Cannot switch role: invalid current role (${String(currentRole)})`);

    try {
      const response = await changeRoleMutation.mutateAsync({ role: nextRole });

      // 혹시 success:false를 200으로 주는 서버면 여기서도 방어
      if (response.success === false) {
        throw new SwitchRoleError(
          response.code ?? 'UNKNOWN',
          response.message ?? 'Failed to switch role',
        );
      }

      const storedRole = response.data?.role;
      if (storedRole === 'ARCHIVER' || storedRole === 'EDITOR') return storedRole;

      return nextRole;
    } catch (err) {
      // 400 HTTPError면 바디 파싱해서 code로 throw
      if (err && typeof err === 'object' && 'response' in (err as any)) {
        const httpErr = err as HTTPError;
        const body = (await httpErr.response.json().catch(() => null)) as any;

        if (body?.success === false && typeof body.code === 'string') {
          throw new SwitchRoleError(body.code, body.message ?? 'Failed to switch role');
        }
      }

      throw err;
    }
  };

  return { authQuery, switchRole, changeRoleMutation };
};
