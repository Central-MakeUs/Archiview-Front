import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverProfileGet } from '../api/archiverProfile-get';

interface IParams {
  useMock?: boolean;
}

export const useGetMyFollows = (params?: IParams) => {
  return useQuery({
    queryKey: archiverKeys.getMyFollows.applyFilters(params).queryKey,
    queryFn: () => archiverProfileGet.getMyFollows(params ?? {}),
  });
};
