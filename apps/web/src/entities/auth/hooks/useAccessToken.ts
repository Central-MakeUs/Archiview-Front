// 이름 너무 구린데 바꾸기;;
'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface IOptions {
  /**
   * localStorage에 저장할 키 이름
   * default: 'accessToken'
   */
  storageKey?: string;

  /**
   * 토큰을 저장한 뒤, URL에서 query 제거를 위해 replace할지 여부
   * default: true
   */
  replaceAfterPersist?: boolean;

  /**
   * replace 경로를 강제로 지정하고 싶을 때 사용
   * 기본은 현재 pathname 사용 (쿼리만 제거)
   */
  replaceTo?: string;

  /**
   * query param 이름
   * default: 'accessToken'
   */
  queryKey?: string;

  /**
   * 이미 로컬스토리지에 토큰이 있으면 덮어쓸지
   * default: true
   */
  overwrite?: boolean;
}

export const useAccessToken = (options: IOptions = {}) => {
  const {
    storageKey = 'accessToken',
    queryKey = 'accessToken',
    replaceAfterPersist = true,
    replaceTo,
    overwrite = true,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPersisted, setIsPersisted] = useState(false);

  const token = useMemo(() => searchParams?.get(queryKey) ?? null, [searchParams, queryKey]);

  useEffect(() => {
    setIsPersisted(false);
    if (!token) return;

    try {
      const existing = localStorage.getItem(storageKey);
      const shouldWrite = overwrite || !existing;

      if (shouldWrite) localStorage.setItem(storageKey, token);
      setIsPersisted(true);
    } catch (e) {
      console.error('Failed to write accessToken to localStorage', e);
      return;
    }

    if (!replaceAfterPersist) return;

    const pathToReplace = replaceTo ?? pathname;
    if (pathToReplace) {
      router.replace(pathToReplace);
    }
  }, [token, storageKey, overwrite, replaceAfterPersist, replaceTo, pathname, router]);

  return { token, isPersisted };
};
