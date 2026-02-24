import { useQuery } from '@tanstack/react-query';

import { editorKeys } from '@/shared/lib/query-keys';
import { editorPlaceGet } from '../api/editorPlace-get';

interface IParams {
  filter?: 'ALL' | 'NEARBY';
  sort?: 'UPDATED' | 'CREATED';
  categoryId?: number;
  latitude?: number;
  longitude?: number;
  useMock?: boolean;
}

export const useGetMyPlaceList = (params?: IParams) => {
  const filter = params?.filter ?? 'ALL';
  const hasNearbyCoords = Number.isFinite(params?.latitude) && Number.isFinite(params?.longitude);

  return useQuery({
    queryKey: editorKeys.getMyPlaceList.applyFilters(params).queryKey,
    queryFn: () => editorPlaceGet.getMyPlaceList(params),
    enabled: filter === 'ALL' || hasNearbyCoords,
  });
};
