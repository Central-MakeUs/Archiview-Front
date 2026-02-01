export const ARCHIVER_ENDPOINTS = {
  me: {
    profile: `archivers/me/profile`,
  },
  publicProfile: (archiverId: number) => `archivers/${archiverId}/profile`,
} as const;
