'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

import { COOKIE_KEYS, getDefaultCookieOptions } from '@/shared/constants/cookies';

import { useGetAuth } from '../queries/useGetAuth';

interface IOptions {
  enabled?: boolean; // 필요 시 조건부 실행
  overwrite?: boolean; // 이미 저장돼도 덮어쓸지
}

export const useSaveRole = (options: IOptions = {}) => {
  const { enabled = true, overwrite = true } = options;

  const query = useGetAuth();

  useEffect(() => {
    if (!enabled) return;
    if (!query.isSuccess) return;

    const role = query.data?.data?.role;
    if (!role) return;

    try {
      const existing = Cookies.get(COOKIE_KEYS.role);
      const shouldWrite = overwrite || !existing;

      if (shouldWrite) {
        Cookies.set(COOKIE_KEYS.role, role, getDefaultCookieOptions());
      }
    } catch (e) {
      console.error('Failed to write role to cookie', e);
    }
  }, [enabled, overwrite, query.isSuccess, query.data]);

  return query; // 필요하면 밖에서 status도 쓰게 반환
};
