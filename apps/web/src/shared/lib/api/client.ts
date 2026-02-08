import 'client-only';

import ky from 'ky';

import type { KyHttpError, ExtendedKyHttpError, ApiErrorResponse } from './common';

export const errorInterceptor = async (error: KyHttpError) => {
  const ct = error.response.headers.get('content-type') ?? '';

  if (ct.includes('application/json')) {
    const data = (await error.response.clone().json()) as ApiErrorResponse;
    (error as ExtendedKyHttpError).errorData = data;
  }
  // console.log(error);
  return error;
};

export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL + '/api/v1',
  timeout: 10000,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    //TODO: 토큰으로 변경
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
  hooks: {
    afterResponse: [
      async (_, __, response) => {
        // JSON이 아닌데 status가 에러면: ky가 HTTPError 던질 거고 beforeError가 fallback로 처리
        if (response.status === 401) {
          window.location.href = '/login';
          // JSON이 아니면 여기서 강제로 끊는 게 낫다 (선택)
          throw new Error('Unauthorized');
        }
      },
    ],
    beforeError: [errorInterceptor],
  },
});
