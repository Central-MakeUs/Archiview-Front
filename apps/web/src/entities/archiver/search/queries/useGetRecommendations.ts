import { archiverSearchGet } from '../api/archiverSearch-get';
import { archiverKeys } from '@/shared/lib/query-keys';
import { IRecommendationsResponseDTO } from '../model/archiverSearch.type';
import { useQuery } from '@tanstack/react-query';

export const useGetRecommendations = () => {
  return useQuery<IRecommendationsResponseDTO>({
    queryKey: archiverKeys.getRecommendations.all.queryKey,
    queryFn: () => archiverSearchGet.getRecommendations(),
  });
};
