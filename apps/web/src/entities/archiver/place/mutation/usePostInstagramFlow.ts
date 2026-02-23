import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiverPlacePost } from '../api/archiverPlace-post';
import { archiverKeys, editorKeys } from '@/shared/lib/query-keys';

export const usePostInstagramFlow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postPlaceId: number) => archiverPlacePost.postInstagramFlow({ postPlaceId }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: archiverKeys.getPlaceDetail._def });
      await queryClient.invalidateQueries({ queryKey: archiverKeys.getArchivePlaces._def });
      await queryClient.invalidateQueries({ queryKey: editorKeys.getInsightPlaceDetail._def });
      await queryClient.invalidateQueries({ queryKey: editorKeys.getInsightSummery._def });
      await queryClient.invalidateQueries({ queryKey: editorKeys.getMyPlaceList._def });
    },
  });
};
