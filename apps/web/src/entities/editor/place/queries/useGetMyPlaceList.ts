import { useQuery } from '@tanstack/react-query';

import { editorKeys } from '@/shared/lib/query-keys';
import { editorPlaceGet } from '../api/editorPlace-get';

interface IParams {
  useMock?: boolean;
}

export const useGetMyPlaceList = (params?: IParams) => {
  return useQuery({
    queryKey: editorKeys.getMyPlaceList.applyFilters(params).queryKey,
    queryFn: () => editorPlaceGet.getMyPlaceList(params),
  });
};
