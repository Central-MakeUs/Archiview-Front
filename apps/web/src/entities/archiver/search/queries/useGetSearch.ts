import { useQuery } from '@tanstack/react-query';
import { ISearchResponseDTO } from '../model/archiverSearch.type';
import { archiverKeys } from '@/shared/lib/query-keys';
import { archiverSearchGet } from '../api/archiverSearch-get';

export const useGetSearch = (params: { search: string; enabled?: boolean }) => {
  const { search, enabled = true } = params;
  return useQuery<ISearchResponseDTO>({
    queryKey: archiverKeys.getSearch.applyFilters({ search }).queryKey,
    queryFn: () => archiverSearchGet.getSearch({ search }),
    enabled: enabled && !!search.trim(),
  });
};
