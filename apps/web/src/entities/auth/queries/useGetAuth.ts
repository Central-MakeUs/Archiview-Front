import { useQuery } from '@tanstack/react-query';

import { authKeys } from '@/shared/lib/query-keys';

import { authGet } from '../api/auth-get';

export const useGetAuth = () => {
  return useQuery({
    queryKey: authKeys.getMyInfo.all.queryKey,
    queryFn: () => authGet.getMyInfo(),
  });
};
