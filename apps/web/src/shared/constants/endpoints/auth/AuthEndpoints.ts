export const AUTH_ENDPOINTS = {
  logout: `auth/logout`,
  me: `auth/me`,
  mobile: {
    apple: `auth/mobile/apple`,
    kakao: `auth/mobile/kakao`,
  },
  refresh: `auth/refresh`,
  test: {
    archiver: `auth/test/archiver`,
    editor: `auth/test/editor`,
  },
  users: {
    onboarding: `users/onboarding`,
    switchRole: `users/switch-role`,
  },
} as const;
