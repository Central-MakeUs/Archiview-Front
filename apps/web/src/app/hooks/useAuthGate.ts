'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { authGet } from '@/entities/auth/api/auth-get';

import Cookies from 'js-cookie';

import {
  COOKIE_KEYS,
  getDefaultCookieOptions,
  type StoredUserRole,
} from '@/shared/constants/cookies';

type Options = {
  loginPath?: string;
  termAgreePath?: string;
  archiverHomePath?: string;
  editorHomePath?: string;
};

const isStoredUserRole = (value: string | null): value is StoredUserRole => {
  return value === 'GUEST' || value === 'ARCHIVER' || value === 'EDITOR';
};

const getHomePath = (role: StoredUserRole, options: Required<Options>): string | null => {
  if (role === 'ARCHIVER') return options.archiverHomePath;
  if (role === 'EDITOR') return options.editorHomePath;
  return null;
};

export const useAuthGate = (options: Options = {}) => {
  const router = useRouter();

  useEffect(() => {
    const normalizedOptions: Required<Options> = {
      loginPath: options.loginPath ?? '/login',
      termAgreePath: options.termAgreePath ?? '/term-agree',
      archiverHomePath: options.archiverHomePath ?? '/archiver/home',
      editorHomePath: options.editorHomePath ?? '/editor/home',
    };

    let cancelled = false;

    const routeFromRoot = async () => {
      let token: string | null = null;
      let role: StoredUserRole | null = null;

      try {
        token = Cookies.get(COOKIE_KEYS.accessToken) ?? null;
      } catch (e) {
        console.error('Failed to read accessToken from cookie', e);
      }

      if (!token) {
        router.replace(normalizedOptions.loginPath);
        return;
      }

      try {
        const storedRole = Cookies.get(COOKIE_KEYS.role) ?? null;
        role = isStoredUserRole(storedRole) ? storedRole : null;
      } catch (e) {
        console.error('Failed to read role from cookie', e);
      }

      if (role) {
        const homePath = getHomePath(role, normalizedOptions);
        if (homePath) {
          router.replace(homePath);
          return;
        }
      }

      try {
        const me = await authGet.getMyInfo();
        const nextRole = me.data?.role ?? null;

        if (cancelled) return;

        if (nextRole && isStoredUserRole(nextRole)) {
          try {
            Cookies.set(COOKIE_KEYS.role, nextRole, getDefaultCookieOptions());
          } catch (e) {
            console.error('Failed to write role to cookie', e);
          }

          router.replace(
            getHomePath(nextRole, normalizedOptions) ?? normalizedOptions.termAgreePath,
          );
          return;
        }

        router.replace(normalizedOptions.loginPath);
      } catch {
        if (cancelled) return;
        router.replace(normalizedOptions.loginPath);
      }
    };

    routeFromRoot().catch((e) => {
      console.error('Failed to route from root', e);
      router.replace(normalizedOptions.loginPath);
    });

    return () => {
      cancelled = true;
    };
  }, [
    router,
    options.loginPath,
    options.termAgreePath,
    options.archiverHomePath,
    options.editorHomePath,
  ]);
};
