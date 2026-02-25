import { useQuery } from '@tanstack/react-query';
import { IRecentResponseDTO } from '../model/archiverSearch.type';
import { archiverKeys } from '@/shared/lib/query-keys';
import { archiverSearchGet } from '../api/archiverSearch-get';

export const useGetRecent = () => {
  return useQuery<IRecentResponseDTO>({
    queryKey: archiverKeys.getRecent.all.queryKey,
    queryFn: () => archiverSearchGet.getRecent(),
  });
};
