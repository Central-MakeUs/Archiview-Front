import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const commonKeys = createQueryKeyStore({
  /**
   * @description 카테고리 목록 조회용 쿼리키 (파라미터 없음)
   * @returns ['getCategories','all']
   */
  getCategories: {
    all: null,
  },
});
