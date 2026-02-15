'use client';

import React from 'react';

interface AppleLoginButtonProps {
  children: React.ReactNode;

  /** Apple Service ID (예: com.archiview.web) */
  clientId: string;

  /** Apple Developer에 등록한 Return URL과 "완전히 동일"해야 함 */
  redirectUri: string;
  redirectUriDev?: string;
  /** 기본: "name email" */
  scope?: 'name email' | 'email' | 'name';

  /** 기본: form_post (애플은 이거 많이 씀) */
  responseMode?: 'form_post' | 'query' | 'fragment';

  /** 기본: "code id_token" */
  responseType?: 'code' | 'code id_token';

  /** CSRF 방지용 state (안 주면 자동 생성) */
  state?: string;

  /** id_token 검증용 nonce (안 주면 자동 생성) */
  nonce?: string;

  /** 추가 쿼리 파라미터 필요하면 */
  extraParams?: Record<string, string>;

  className?: string;
  disabled?: boolean;

  /** redirect 직전 훅 */
  onBeforeRedirect?: (params: { url: string; state: string; nonce: string }) => void;
}

const randomId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const isLocalhost = () => {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1';
};

export const AppleLoginButton = ({
  children,
  clientId,
  redirectUri,
  redirectUriDev,
  scope = 'name email',
  responseMode = 'form_post',
  responseType = 'code id_token',
  state,
  nonce,
  extraParams,
  className,
  disabled,
  onBeforeRedirect,
}: AppleLoginButtonProps) => {
  const handleClick = () => {
    const finalState = state ?? randomId();
    const finalNonce = nonce ?? randomId();

    const finalRedirectUri = isLocalhost() && redirectUriDev ? redirectUriDev : redirectUri;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: finalRedirectUri,
      response_type: responseType,
      response_mode: responseMode,
      scope,
      state: finalState,
      nonce: finalNonce,
      ...(extraParams ?? {}),
    });

    const url = `https://appleid.apple.com/auth/authorize?${params.toString()}`;

    onBeforeRedirect?.({ url, state: finalState, nonce: finalNonce });

    window.location.href = url;
  };

  return (
    <button type="button" className={className} disabled={disabled} onClick={handleClick}>
      {children}
    </button>
  );
};
