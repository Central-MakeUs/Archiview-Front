import { useQuery } from '@tanstack/react-query';
import { archiverKeys } from '@/shared/lib/query-keys';
import { archiverCategoryGet } from '../api/archiverCategory-get';

export const useGetCategoryPlaceList = (params: { categoryId: number; useMock?: boolean }) => {
  return useQuery({
    queryKey: archiverKeys.getCategoryPlaceList.applyFilters(params).queryKey,
    queryFn: () => archiverCategoryGet.getCategoryPlaceList(params),
  });
};
