import { archiverKeys } from '@/shared/lib/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiverSearchDelete } from '../api/archiverSearch-delete';
import { toast } from 'sonner';
import { ExtendedKyHttpError } from '@/shared/lib/api/common';

export const useDeleteRecent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (historyId: number) => archiverSearchDelete.deleteRecent(historyId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: archiverKeys.getRecent.all.queryKey });
    },
    onError: (error: ExtendedKyHttpError) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });
};
