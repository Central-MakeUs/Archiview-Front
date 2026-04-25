import type { LoginFailureReason } from './types';

export const LOGIN_FAILURE_MESSAGES: Record<LoginFailureReason, string> = {
  bridgeUnavailable: '앱과 연결할 수 없어요. 앱을 다시 실행해 주세요.',
  userCancelled: '로그인이 취소되었어요.',
  nativeError: '로그인 중 문제가 발생했어요. 다시 시도해 주세요.',
  credentialInvalid: '로그인 정보가 올바르지 않아요.',
  tokenMissing: '서버에서 토큰을 받지 못했어요.',
  serverError: '서버 통신에 실패했어요. 잠시 후 다시 시도해 주세요.',
};
