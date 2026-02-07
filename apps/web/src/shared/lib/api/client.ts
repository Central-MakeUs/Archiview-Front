import 'client-only';

import ky from 'ky';

import type { KyHttpError, ExtendedKyHttpError, ApiErrorResponse } from './common';

export const errorInterceptor = async (error: KyHttpError) => {
  const ct = error.response.headers.get('content-type') ?? '';

  if (ct.includes('application/json')) {
    const data = (await error.response.clone().json()) as ApiErrorResponse;
    (error as ExtendedKyHttpError).errorData = data;
  }

  return error;
};

export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL + '/api/v1',
  timeout: 10000,
  credentials: 'include',
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
    beforeRequest: [
      (request) => {
        const token =
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ODc2NzZlYi0xNWM5LTRiYTAtYjc2Ny03MzFhNWJhZjVjMDQiLCJlbWFpbCI6InRlc3QtZWRpdG9yQGFyY2hpdmlldy5jb20iLCJyb2xlIjoiRURJVE9SIiwiaWF0IjoxNzcwMjkwMDQ5LCJleHAiOjE3NzI4ODIwNDl9.SBluaUYuI7McS4oeEIsAWM7sNAZ8sWVWV1Vx8P0Xs8dBH8SsqweV556ebpXVa_YER8zklbbC_k-EeF1PeHnrZw"';

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    beforeError: [errorInterceptor],
  },
});
