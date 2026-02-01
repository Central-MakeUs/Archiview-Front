const BASE = '/api/v1/editors';

export const EDITOR_ENDPOINTS = {
  posts: `${BASE}/posts`,
  publicProfile: (editorId: string | number) => `${BASE}/${editorId}/profile`,
  me: {
    places: `${BASE}/me/places`,
    profile: `${BASE}/me/profile`,
    insights: {
      places: `${BASE}/me/insights/places`,
      placesDetail: (placeId: string | number) => `${BASE}/me/insights/places/${placeId}`,
      summary: `${BASE}/me/insights/summary`,
    },
    map: {
      places: `${BASE}/me/map/places`,
    },
  },
} as const;
