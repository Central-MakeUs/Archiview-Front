import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const authKeys = createQueryKeyStore({
  /**
   * @param
   * @description 현재 인증된 사용자 정보 조회
   * @returns ['getMyProfile']
   */
  getMyInfo: {
    all: null,
  },
});
