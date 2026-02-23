export const ARCHIVER_ENDPOINTS = {
  me: {
    profile: `archivers/me/profile`,
  },
  places: {
    placeDetail: (placeId: number) => `archivers/places/${placeId}`,
    hot: `archivers/places/hot`,
  },
  editors: {
    trusted: `archivers/editors/trusted`,
  },
  follows: `archivers/follows`,
  archives: {
    postPlaces: (postPlaceId: number) => `archivers/archives/post-places/${postPlaceId}`,
  },
  archivers: {
    postPlaces: {
      directionFlow: (postPlaceId: number) =>
        `archivers/post-places/${postPlaceId}/direction-inflow`,
      instagramFlow: (postPlaceId: number) =>
        `archivers/post-places/${postPlaceId}/instagram-inflow`,
    },
  },
} as const;
