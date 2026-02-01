export const EDITOR_ENDPOINTS = {
  posts: `editors/posts`,
  publicProfile: (editorId: number) => `editors/${editorId}/profile`,
  me: {
    places: `editors/me/places`,
    profile: `editors/me/profile`,
    insights: {
      places: `editors/me/insights/places`,
      placesDetail: (placeId: string | number) => `editors/me/insights/places/${placeId}`,
      summary: `editors/me/insights/summary`,
    },
    map: {
      places: `editors/me/map/places`,
    },
  },
} as const;
