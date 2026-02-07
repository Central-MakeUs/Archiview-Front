export const ARCHIVER_ENDPOINTS = {
  me: {
    profile: `archivers/me/profile`,
  },
  places: {
    placeDetail: (placeId: number) => `archivers/places/${placeId}`,
    hot: `archivers/places/hot`,
  },
  editors: {
    trusted: `archivers/editores/trusted`,
  },
  follows: `archivers/follows`,
  editorsTrusted: `archivers/editors/trusted`,
} as const;
