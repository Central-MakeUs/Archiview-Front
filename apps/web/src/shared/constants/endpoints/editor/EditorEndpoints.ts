export const EDITOR_ENDPOINTS = {
  posts: 'editors/posts',

  presignedUrl: 'editors/posts/presigned-url',
  publicProfile: (editorId: number) => `editors/${editorId}/profile`,
  me: {
    places: `editors/me/places`,
    placesDetail: (placeId: string | number) => `editors/me/places/${placeId}`,
    postsDetail: (postId: string | number) => `editors/me/posts/${postId}`,
    profile: `editors/me/profile`,
    insights: {
      places: `editors/me/insights/places`,
      summary: `editors/me/insights/summary`,
    },
    map: {
      places: `editors/me/map/places`,
    },
  },
} as const;
