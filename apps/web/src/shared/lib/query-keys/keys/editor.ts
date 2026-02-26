import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const editorKeys = createQueryKeyStore({
  /**
   * @param {{sort?: string, useMock?: boolean}} params
   * @description 인사이트 장소 목록 조회용 쿼리키를 입력 파라미터로 생성
   * @returns ['getInsightPlaceList', 'applyFilters', sort, useMock]
   */
  getInsightPlaceList: {
    all: null,
    applyFilters: (params?: { sort?: string; useMock?: boolean }) => [
      params?.sort ?? 'RECENT',
      params?.useMock ?? false,
    ],
  },

  /**
   * @param {{placeId: number, useMock?: boolean}} params
   * @description 인사이트 장소 상세 조회용 쿼리키를 입력 파라미터로 생성
   * @returns ['getInsightPlaceDetail', 'applyFilters', placeId, useMock]
   */
  getInsightPlaceDetail: {
    all: null,
    applyFilters: (params: { placeId: number; useMock?: boolean }) => [
      params.placeId,
      params.useMock ?? false,
    ],
  },

  /**
   * @param {{period?: string, useMock?: boolean}} params
   * @description 인사이트 요약 조회용 쿼리키를 입력 파라미터로 생성
   * @returns ['getInsightSummery', 'applyFilters', period, useMock]
   */
  getInsightSummery: {
    all: null,
    applyFilters: (params?: { period?: string; useMock?: boolean }) => [
      params?.period ?? 'ALL',
      params?.useMock ?? false,
    ],
  },

  /**
   * @param {{filter?: 'ALL' | 'NEARBY', categoryId?: number, latitude?: number, longitude?: number, useMock?: boolean}} params
   * @description 내 장소 지도 핀 조회용 쿼리키를 입력 파라미터로 생성
   * @returns ['getMyPlacePin', 'applyFilters', filter, categoryId, latitude, longitude, useMock]
   */
  getMyPlacePin: {
    all: null,
    applyFilters: (params?: {
      filter?: 'ALL' | 'NEARBY';
      categoryId?: number;
      latitude?: number;
      longitude?: number;
      useMock?: boolean;
    }) => {
      const filter = params?.filter ?? 'ALL';
      const latitude = filter === 'NEARBY' ? (params?.latitude ?? 'none') : 'none';
      const longitude = filter === 'NEARBY' ? (params?.longitude ?? 'none') : 'none';

      return [filter, params?.categoryId ?? 'none', latitude, longitude, params?.useMock ?? false];
    },
  },

  /**
   * @param {{filter?: 'ALL' | 'NEARBY', sort?: 'UPDATED' | 'CREATED', categoryId?: number, latitude?: number, longitude?: number, useMock?: boolean}} params
   * @description 내가 업로드한 장소 목록 조회용 쿼리키
   * @returns ['getMyPlaceList', 'applyFilters', filter, sort, categoryId, latitude, longitude, useMock]
   */
  getMyPlaceList: {
    all: null,
    applyFilters: (params?: {
      filter?: 'ALL' | 'NEARBY';
      sort?: 'UPDATED' | 'CREATED';
      categoryId?: number;
      latitude?: number;
      longitude?: number;
      useMock?: boolean;
    }) => [
      params?.filter ?? 'ALL',
      params?.sort ?? 'UPDATED',
      params?.categoryId ?? 'none',
      params?.latitude ?? 'none',
      params?.longitude ?? 'none',
      params?.useMock ?? false,
    ],
  },

  /**
   * @description 내(로그인한) 에디터 프로필 조회용 쿼리키 (파라미터 없음)
   * @returns ['getEditorMeProfile','all']
   */
  getEditorMeProfile: {
    all: null,
  },

  /**
   * @description 특정 에디터 공개 프로필 조회용 쿼리키
   * @returns ['getEditorPublicProfile','applyFilters',editorId]
   */
  getEditorPublicProfile: {
    all: null,
    applyFilters: (editorId: number) => [editorId],
  },

  /**
   * @description 특정 장소 상세 조회용 쿼리키
   * @returns ['getMyPlaceDetail', 'applyFilters', placeId, useMock]
   */
  getMyPlaceDetail: {
    all: null,
    applyFilters: (params: { placeId: number; useMock?: boolean }) => [
      params.placeId,
      params.useMock ?? false,
    ],
  },

  /**
   * @description 특정 게시글 장소 조회용 쿼리키
   * @returns ['getPostByPlace', 'applyFilters', postId, useMock]
   */
  getPostByPlaceId: {
    all: null,
    applyFilters: (params: { postPlaceId: number; useMock?: boolean }) => [
      params.postPlaceId,
      params.useMock ?? false,
    ],
  },
});
