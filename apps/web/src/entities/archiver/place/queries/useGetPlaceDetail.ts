import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverPlaceGet } from '../api/archiverPlace-get';

interface IParams {
  placeId: number;
  useMock?: boolean;
}

export const useGetPlaceDetail = (params: IParams) => {
  return useQuery({
    queryKey: archiverKeys.getPlaceDetail.applyFilters(params).queryKey,
    queryFn: () => archiverPlaceGet.getPlaceDetail(params),
  });
};
