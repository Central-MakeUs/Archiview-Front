import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const archiverKeys = createQueryKeyStore({
  /**
   * @param {{useMock?: boolean}} params
   * @description 아카이버 내 프로필 조회용 쿼리키
   * @returns ['getMyProfile', 'applyFilters', useMock]
   */
  getMyProfile: {
    all: null,
    applyFilters: (params?: { useMock?: boolean }) => [params?.useMock ?? false],
  },

  /**
   * @param {{useMock?: boolean}} params
   * @description 신뢰하는 에디터 목록 조회용 쿼리키
   * @returns ['getEditorsTrusted', 'applyFilters', useMock]
   */
  getEditorsTrusted: {
    all: null,
    applyFilters: (params?: { useMock?: boolean }) => [params?.useMock ?? false],
  },

  /**
   * @param {{useMock?: boolean}} params
   * @description 내 팔로우 목록 조회용 쿼리키
   * @returns ['getMyFollows', 'applyFilters', useMock]
   */
  getMyFollows: {
    all: null,
    applyFilters: (params?: { useMock?: boolean }) => [params?.useMock ?? false],
  },

  /**
   * @param {{placeId: number, useMock?: boolean}} params
   * @description 장소 상세 조회용 쿼리키
   * @returns ['getPlaceDetail', 'applyFilters', placeId, useMock]
   */
  getPlaceDetail: {
    all: null,
    applyFilters: (params: { placeId: number; useMock?: boolean }) => [
      params.placeId,
      params?.useMock ?? false,
    ],
  },

  /**
   * @param {{useMock?: boolean}} params
   * @description 아카이브한 장소카드 목록 조회용 쿼리키
   * @returns ['getArchivePlaces', 'applyFilters', useMock]
   */
  getArchivePlaces: {
    all: null,
    applyFilters: (params?: { useMock?: boolean }) => [params?.useMock ?? false],
  },

  /**
   * @param {{latitude: number, longitude: number, useMock?: boolean}} params
   * @description 내 주변 1km 장소 조회용 쿼리키
   * @returns ['getNearbyPlaces', 'applyFilters', latitude, longitude, useMock]
   */
  getNearbyPlaces: {
    all: null,
    applyFilters: (params: { latitude: number; longitude: number; useMock?: boolean }) => [
      params.latitude,
      params.longitude,
      params?.useMock ?? false,
    ],
  },

  /**
   * @param {{size?: number, useMock?: boolean}} params
   * @description 핫플 목록 조회용 쿼리키
   * @returns ['getHotPlaces', 'applyFilters', size, useMock]
   */
  getHotPlaces: {
    all: null,
    applyFilters: (params?: { size?: number; useMock?: boolean }) => [
      params?.size ?? 10,
      params?.useMock ?? false,
    ],
  },

  /**
   * @param {{editorId: string}} params
   * @description 에디터 프로필 조회용 쿼리키
   * @returns ['getEditorProfile', 'applyFilters', editorId]
   */
  getEditorProfile: {
    all: null,
    applyFilters: (params: { editorId: string; useMock?: boolean }) => [
      params.editorId,
      params?.useMock ?? false,
    ],
  },

  /**
   * @param {{userId: string, sort?: 'LATEST' | 'OLDEST', useMock?: boolean}} params
   * @description 에디터가 업로드한 장소(포스트플레이스) 목록 조회용 쿼리키
   * @returns ['getEditorPlaceList', 'applyFilters', userId, sort, useMock]
   */
  getEditorPlaceList: {
    all: null,
    applyFilters: (params: { userId: string; sort?: 'LATEST' | 'OLDEST'; useMock?: boolean }) => [
      params.userId,
      params?.sort ?? 'LATEST',
      params?.useMock ?? false,
    ],
  },

  /**
   * @param {{useMock?: boolean}} params
   * @description 차단한 에디터 목록 조회용 쿼리키
   * @returns ['getBlockedEditors', 'applyFilters', useMock]
   */
  getBlockedEditors: {
    all: null,
    applyFilters: (params?: { useMock?: boolean }) => [params?.useMock ?? false],
  },

  /**
   * @param {{categoryId: number, useMock?: boolean}} params
   * @description 카테고리별 장소 목록 조회용 쿼리키
   * @returns ['getCategoryPlaceList', 'applyFilters', categoryId, useMock]
   */
  getCategoryPlaceList: {
    all: null,
    applyFilters: (params: { categoryId: number; useMock?: boolean }) => [
      params.categoryId,
      params?.useMock ?? false,
    ],
  },
});
