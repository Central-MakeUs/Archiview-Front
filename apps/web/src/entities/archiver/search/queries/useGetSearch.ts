import { useQuery } from '@tanstack/react-query';
import { ISearchResponseDTO } from '../model/archiverSearch.type';
import { archiverKeys } from '@/shared/lib/query-keys';
import { archiverSearchGet } from '../api/archiverSearch-get';

export const useGetSearch = (params: { search: string }) => {
  return useQuery<ISearchResponseDTO>({
    queryKey: archiverKeys.getSearch.applyFilters(params).queryKey,
    queryFn: () => archiverSearchGet.getSearch(params),
  });
};
