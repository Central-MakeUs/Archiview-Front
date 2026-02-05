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
});
