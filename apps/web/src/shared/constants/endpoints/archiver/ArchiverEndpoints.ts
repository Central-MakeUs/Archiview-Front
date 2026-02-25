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
    map: {
      places: `archivers/archives/post-places/map/places`,
    },
  },
  archivers: {
    search: {
      search: (search: string) => `archivers/search?q=${search}`,
      delete: (historyId: number) => `archivers/search/recent/${historyId}`,
      recent: `archivers/search/recent`,
      recommendations: `archivers/search/recommendations`,
    },
    editors: {
      editorPlace: (userId: string, placeId: number) =>
        `archivers/editors/${userId}/places/${placeId}`,
    },
    postPlaces: {
      directionFlow: (postPlaceId: number) =>
        `archivers/post-places/${postPlaceId}/direction-inflow`,
      instagramFlow: (postPlaceId: number) =>
        `archivers/post-places/${postPlaceId}/instagram-inflow`,
    },
  },
} as const;
