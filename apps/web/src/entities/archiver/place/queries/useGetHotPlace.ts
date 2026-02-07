import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverPlaceGet } from '../api/archiverPlace-get';

interface IParams {
  size?: number;
  useMock?: boolean;
}

export const useGetHotPlace = (params?: IParams) => {
  return useQuery({
    queryKey: archiverKeys.getHotPlaces.applyFilters(params).queryKey,
    queryFn: () => archiverPlaceGet.getHotPlaces(params ?? {}),
  });
};
