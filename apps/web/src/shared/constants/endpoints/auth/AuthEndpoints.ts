const BASE = '/api/auth';

export const AUTH_ENDPOINTS = {
  logout: `${BASE}/logout`,
  me: `${BASE}/me`,
  mobile: {
    apple: `${BASE}/mobile/apple`,
    kakao: `${BASE}/mobile/kakao`,
  },
  refresh: `${BASE}/refresh`,
  test: {
    archiver: `${BASE}/test/archiver`,
    editor: `${BASE}/test/editor`,
  },
} as const;
