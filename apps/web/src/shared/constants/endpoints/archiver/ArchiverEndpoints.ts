export const ARCHIVER_ENDPOINTS = {
  me: {
    profile: `me/profile`,
  },
  publicProfile: (archiverId: number) => `${archiverId}/profile`,
} as const;
