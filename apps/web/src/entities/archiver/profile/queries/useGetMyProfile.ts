import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverProfileGet } from '../api/archiverProfile-get';

interface IParams {
  useMock?: boolean;
}

export const useGetMyProfile = (params?: IParams) => {
  return useQuery({
    queryKey: archiverKeys.getMyProfile.applyFilters(params).queryKey,
    queryFn: () => archiverProfileGet.getMyProfile(params ?? {}),
  });
};
