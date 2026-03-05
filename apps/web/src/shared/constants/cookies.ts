export const COOKIE_KEYS = {
  accessToken: 'accessToken',
  role: 'role',
} as const;

export type StoredUserRole = 'GUEST' | 'ARCHIVER' | 'EDITOR';

const DEFAULT_COOKIE_PATH = '/';

export const getDefaultCookieOptions = () => ({
  path: DEFAULT_COOKIE_PATH,
  expires: 7,
  secure: typeof window !== 'undefined' && window.location?.protocol === 'https:',
  sameSite: 'lax' as const,
});
