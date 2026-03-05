import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverProfileGet } from '../api/archiverProfile-get';

interface IParams {
  useMock?: boolean;
  optimizeForNavigation?: boolean;
}

const NAVIGATION_CACHE_STALE_TIME = 5 * 60 * 1000;
const NAVIGATION_CACHE_GC_TIME = 30 * 60 * 1000;

export const useGetMyProfile = (params?: IParams) => {
  const optimizeForNavigation = params?.optimizeForNavigation ?? false;

  return useQuery({
    queryKey: archiverKeys.getMyProfile.applyFilters(params).queryKey,
    queryFn: () => archiverProfileGet.getMyProfile(params ?? {}),
    staleTime: optimizeForNavigation ? NAVIGATION_CACHE_STALE_TIME : undefined,
    gcTime: optimizeForNavigation ? NAVIGATION_CACHE_GC_TIME : undefined,
    refetchOnMount: optimizeForNavigation ? false : undefined,
    placeholderData: optimizeForNavigation ? (previousData) => previousData : undefined,
  });
};
