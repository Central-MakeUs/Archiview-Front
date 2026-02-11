export const LOCAL_STORAGE_KEYS = {
  accessToken: 'accessToken',
  role: 'role',
} as const;

export type StoredUserRole = 'GUEST' | 'ARCHIVER' | 'EDITOR';
