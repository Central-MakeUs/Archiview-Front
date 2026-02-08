'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/shared/constants/localStorageKeys';

import { useAccessToken } from './useAccessToken';
import { useSaveRole } from './useSaveRole';

export const useAuth = () => {
  const searchParams = useSearchParams();

  // 이번 진입에 accessToken이 들어왔는지 여부
  const hasAccessTokenInQuery = useMemo(() => !!searchParams?.get('accessToken'), [searchParams]);

  // 1) accessToken 저장 + 쿼리 제거
  useAccessToken({
    storageKey: LOCAL_STORAGE_KEYS.accessToken,
    queryKey: 'accessToken',
  });

  // 2) accessToken 쿼리로 들어온 경우에만 내정보 조회해서 role 저장
  // (이미 로그인 상태로 그냥 들어온 페이지면 굳이 매번 조회 안 하게)
  const authQuery = useSaveRole({
    enabled: hasAccessTokenInQuery,
  });

  return { authQuery };
};
