import ky from 'ky';
import { headers } from 'next/headers';

import { ApiResponse } from './common';
import { ApiError } from './error';

export const baseKy = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.ok) {
          const body = (await response.clone().json()) as ApiResponse<unknown>;

          if (!body.success) {
            throw new ApiError(body);
          }
        }
      },
    ],
  },
});

export const serverApi = baseKy.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        // Next.js 서버 환경에서 헤더 가져오기
        const headerList = await headers();
        const cookie = headerList.get('cookie');

        // 쿠키가 있다면 API 요청에 실어서 보냄 (인증 유지)
        if (cookie) {
          request.headers.set('Cookie', cookie);
        }

        // 필요하다면 User-Agent 등 다른 헤더도 전달 가능
        const userAgent = headerList.get('user-agent');
        if (userAgent) {
          request.headers.set('User-Agent', userAgent);
        }
      },
    ],
  },
});

export const clientApi = baseKy.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        // 예: 로컬 스토리지에 토큰이 있다면 Authorization 헤더 추가
        // (쿠키 인증 방식(httpOnly)을 쓴다면 이 부분은 없어도 됩니다)
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 인증 만료 처리 (401 Unauthorized)
        if (response.status === 401) {
          if (typeof window !== 'undefined') {
            // 로그인 페이지로 강제 이동
            window.location.href = '/login';
          }
        }
      },
    ],
  },
});
