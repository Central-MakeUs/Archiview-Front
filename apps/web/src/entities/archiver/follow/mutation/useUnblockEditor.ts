import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { invalidateAllArchiverQueries } from '@/shared/lib/query-keys';
import type { ExtendedKyHttpError } from '@/shared/lib/api/common';

import { archiverFollowDelete } from '../api/archiverFollow-delete';
import type { IUnBlockEditorResponseDTO } from '../model/archiverFollow.type';

interface IUseUnBlockEditorOptions {
  useMock?: boolean;
  onSuccess?: (data: IUnBlockEditorResponseDTO) => void;
}

export const useUnBlockEditor = (options?: IUseUnBlockEditorOptions) => {
  const queryClient = useQueryClient();

  const { mutate: unBlockEditor, ...rest } = useMutation<
    IUnBlockEditorResponseDTO,
    ExtendedKyHttpError,
    string
  >({
    mutationFn: (editorId: string) => archiverFollowDelete.unBlockEditor(editorId),

    onSuccess: async (data) => {
      await invalidateAllArchiverQueries(queryClient);

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });

  return { unBlockEditor, ...rest };
};
