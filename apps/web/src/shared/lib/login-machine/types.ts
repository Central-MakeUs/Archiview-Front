export type LoginProvider = 'KAKAO' | 'APPLE';
export type LoginPlatform = 'NATIVE' | 'WEB';

export type LoginFailureReason =
  // native bridge / SDK
  | 'bridgeUnavailable'
  | 'userCancelled'
  | 'nativeError'
  // credential / 서버 계약
  | 'credentialInvalid'
  | 'tokenMissing'
  // 네트워크 / 백엔드
  | 'serverError';

export type LoginState =
  | { tag: 'idle' }
  | { tag: 'authenticating'; provider: LoginProvider; platform: LoginPlatform }
  | { tag: 'failed'; reason: LoginFailureReason };

export type LoginEvent =
  | { type: 'START'; provider: LoginProvider; platform: LoginPlatform }
  | { type: 'SUCCESS'; accessToken: string }
  | { type: 'FAILURE'; reason: LoginFailureReason }
  | { type: 'RESET' };
