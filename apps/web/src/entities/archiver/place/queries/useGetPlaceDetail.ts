import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverPlaceGet } from '../api/archiverPlace-get';

interface IParams {
  placeId: number;
  useMock?: boolean;
  enabled?: boolean;
}

export const useGetPlaceDetail = ({ placeId, useMock, enabled }: IParams) => {
  return useQuery({
    queryKey: archiverKeys.getPlaceDetail.applyFilters({ placeId, useMock }).queryKey,
    queryFn: () => archiverPlaceGet.getPlaceDetail({ placeId, useMock }),
    enabled: enabled ?? true,
  });
};
