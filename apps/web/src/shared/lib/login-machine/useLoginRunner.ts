'use client';

/* eslint-disable boundaries/element-types -- 러너는 shared 에 두되, entities 의 auth mutation 을 주입받아 쓰는 대신 직접 import. 원칙상 features 에 속하지만 머신과 묶어두기 위해 shared 에 둠. */

import { useEffect } from 'react';
import Cookies from 'js-cookie';

import { COOKIE_KEYS, getDefaultCookieOptions } from '@/shared/constants/cookies';
import {
  isNativeMethodAvailable,
  isWebViewBridgeAvailable,
  signInWithApple,
  signInWithKakao,
} from '@/shared/lib/native-bridge';
import { useAppleMobileLogin } from '@/entities/auth/mutations/useAppleMobileLogin';
import { useKakaoMobileLogin } from '@/entities/auth/mutations/useKakaoMobileLogin';
import type {
  IAppleMobileLoginResponseDTO,
  IKakaoMobileLoginResponseDTO,
} from '@/entities/auth/model/auth.type';

import type { LoginMachine } from './machine';
import type { LoginProvider } from './types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const extractAccessToken = (
  response: IAppleMobileLoginResponseDTO | IKakaoMobileLoginResponseDTO,
): string | null => {
  if (!response.success) return null;
  if (!isRecord(response.data)) return null;
  const token = response.data.accessToken;
  return typeof token === 'string' && token.length > 0 ? token : null;
};

const randomId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const isLocalhost = () => {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '192.168.0.6';
};

const redirectKakaoWeb = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const kakaoPath = process.env.NEXT_PUBLIC_KAKAO_URL;
  if (!kakaoPath) return;

  const normalizedBase = apiBaseUrl?.endsWith('/') ? apiBaseUrl.slice(0, -1) : (apiBaseUrl ?? '');
  const normalizedPath = kakaoPath.startsWith('/') ? kakaoPath : `/${kakaoPath}`;
  const target = `${normalizedBase}${normalizedPath}`;

  const url = new URL(target, window.location.origin);
  if (process.env.NODE_ENV === 'development') {
    url.searchParams.set('dev', 'true');
  }

  const isRelative = !/^(https?:)?\/\//.test(target);
  window.location.href = isRelative ? `${url.pathname}${url.search}${url.hash}` : url.toString();
};

const redirectAppleWeb = () => {
  const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI;
  const redirectUriDev = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI_DEV;
  if (!clientId || !redirectUri) return;

  const finalRedirectUri = isLocalhost() && redirectUriDev ? redirectUriDev : redirectUri;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: finalRedirectUri,
    response_type: 'code id_token',
    response_mode: 'form_post',
    scope: 'name email',
    state: randomId(),
    nonce: randomId(),
  });

  window.location.href = `https://appleid.apple.com/auth/authorize?${params.toString()}`;
};

const nativeMethodNameOf = (provider: LoginProvider): 'signInWithKakao' | 'signInWithApple' =>
  provider === 'KAKAO' ? 'signInWithKakao' : 'signInWithApple';

export const useLoginRunner = (machine: LoginMachine) => {
  const { mutateAsync: kakaoExchange } = useKakaoMobileLogin();
  const { mutateAsync: appleExchange } = useAppleMobileLogin();

  useEffect(() => {
    const runNativeKakao = async () => {
      const result = await signInWithKakao();
      if (!result) return machine.send({ type: 'FAILURE', reason: 'bridgeUnavailable' });
      if (result.status === 'cancelled')
        return machine.send({ type: 'FAILURE', reason: 'userCancelled' });
      if (result.status === 'error')
        return machine.send({ type: 'FAILURE', reason: 'nativeError' });

      const kakaoAccessToken = result.credential.accessToken;
      if (!kakaoAccessToken) return machine.send({ type: 'FAILURE', reason: 'credentialInvalid' });

      const response = await kakaoExchange({ accessToken: kakaoAccessToken });
      const appToken = extractAccessToken(response);
      if (!appToken) return machine.send({ type: 'FAILURE', reason: 'tokenMissing' });

      machine.send({ type: 'SUCCESS', accessToken: appToken });
    };

    const runNativeApple = async () => {
      const result = await signInWithApple();
      if (!result) return machine.send({ type: 'FAILURE', reason: 'bridgeUnavailable' });
      if (result.status === 'cancelled')
        return machine.send({ type: 'FAILURE', reason: 'userCancelled' });
      if (result.status === 'error')
        return machine.send({ type: 'FAILURE', reason: 'nativeError' });

      const { idToken, authorizationCode } = result.credential;
      if (!idToken || !authorizationCode) {
        return machine.send({ type: 'FAILURE', reason: 'credentialInvalid' });
      }

      const response = await appleExchange({ idToken, authorizationCode });
      const appToken = extractAccessToken(response);
      if (!appToken) return machine.send({ type: 'FAILURE', reason: 'tokenMissing' });

      machine.send({ type: 'SUCCESS', accessToken: appToken });
    };

    machine.onCommand(async (cmd) => {
      if (cmd.type === 'PERSIST_AND_REDIRECT') {
        Cookies.set(COOKIE_KEYS.accessToken, cmd.accessToken, getDefaultCookieOptions());
        window.location.href = '/';
        return;
      }

      if (cmd.type === 'RUN_LOGIN_PIPELINE') {
        if (cmd.platform === 'WEB') {
          if (cmd.provider === 'KAKAO') redirectKakaoWeb();
          else redirectAppleWeb();
          return;
        }

        if (
          !isWebViewBridgeAvailable() ||
          !isNativeMethodAvailable(nativeMethodNameOf(cmd.provider))
        ) {
          machine.send({ type: 'FAILURE', reason: 'bridgeUnavailable' });
          return;
        }

        try {
          if (cmd.provider === 'KAKAO') await runNativeKakao();
          else await runNativeApple();
        } catch {
          machine.send({ type: 'FAILURE', reason: 'serverError' });
        }
      }
    });
  }, [machine, kakaoExchange, appleExchange]);
};
