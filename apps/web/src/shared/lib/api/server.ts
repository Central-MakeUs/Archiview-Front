import 'server-only';

import ky from 'ky';
import { headers } from 'next/headers';

import type { ApiResponse } from './common';
import { ApiError } from './error';

export const serverApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      async (request) => {
        const headerList = await headers();
        const cookie = headerList.get('cookie');
        const userAgent = headerList.get('user-agent');

        if (cookie) {
          request.headers.set('Cookie', cookie);
        }

        if (userAgent) {
          request.headers.set('User-Agent', userAgent);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) return;

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) return;

        const body = (await response.clone().json()) as ApiResponse<unknown>;
        if (!body.success) {
          throw new ApiError(body);
        }
      },
    ],
  },
});
