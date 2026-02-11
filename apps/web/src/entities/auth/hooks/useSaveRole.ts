'use client';

import { useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '@/shared/constants/localStorageKeys';

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
      const existing = localStorage.getItem(LOCAL_STORAGE_KEYS.role);
      const shouldWrite = overwrite || !existing;

      if (shouldWrite) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.role, role);
      }
    } catch (e) {
      console.error('Failed to write role to localStorage', e);
    }
  }, [enabled, overwrite, query.isSuccess, query.data]);

  return query; // 필요하면 밖에서 status도 쓰게 반환
};
