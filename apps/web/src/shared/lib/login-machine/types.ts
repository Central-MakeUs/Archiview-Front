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
  | { tag: 'authenticating'; provider: LoginProvider; platform: LoginPlatform; attempt: number }
  | {
      tag: 'retrying';
      provider: LoginProvider;
      platform: LoginPlatform;
      attempt: number;
      reason: LoginFailureReason;
    }
  | { tag: 'failed'; reason: LoginFailureReason };

export type LoginEvent =
  | { type: 'START'; provider: LoginProvider; platform: LoginPlatform }
  | { type: 'SUCCESS'; accessToken: string }
  | { type: 'FAILURE'; reason: LoginFailureReason }
  | { type: 'RETRY_TIMEOUT_FIRED' }
  | { type: 'RESET' };

export type LoginCommand =
  | { type: 'RUN_LOGIN_PIPELINE'; provider: LoginProvider; platform: LoginPlatform }
  | {
      type: 'SCHEDULE_RETRY';
      provider: LoginProvider;
      platform: LoginPlatform;
      attempt: number;
      delayMs: number;
    }
  | { type: 'PERSIST_AND_REDIRECT'; accessToken: string };
