import type { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverFollowDelete } from '../api/archiverFollow-delete';
import type { IFollowResponseDTO } from '../model/archiverFollow.type';

interface IUseUnfollowEditorOptions {
  onSuccess?: (data: IFollowResponseDTO) => void;
}

export const useUnfollowEditor = (options?: IUseUnfollowEditorOptions) => {
  const qc = useQueryClient();

  const { mutate: unfollowEditor } = useMutation({
    mutationFn: (editorId: string) => archiverFollowDelete.unFollowEditor(editorId),
    onSuccess: async (data: IFollowResponseDTO) => {
      toast.success('언팔로우 완료');

      await qc.invalidateQueries({ queryKey: archiverKeys.getMyFollows.all.queryKey });

      options?.onSuccess?.(data);
    },
    onError: (error: ExtendedKyHttpError) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });

  return { unfollowEditor };
};
