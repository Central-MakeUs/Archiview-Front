import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { invalidateAllArchiverQueries } from '@/shared/lib/query-keys';
import type { ExtendedKyHttpError } from '@/shared/lib/api/common';

import { archiverFollowPost } from '../api/archiverFollow-post';
import type { IBlockEditorResponseDTO } from '../model/archiverFollow.type';

interface IUseBlockEditorOptions {
  useMock?: boolean;
  onSuccess?: (data: IBlockEditorResponseDTO) => void;
}

export const useBlockEditor = (options?: IUseBlockEditorOptions) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: blockEditor, ...rest } = useMutation<
    IBlockEditorResponseDTO,
    ExtendedKyHttpError,
    string
  >({
    mutationFn: (editorId: string) => archiverFollowPost.blockEditor(editorId),

    onSuccess: async (data) => {
      await router.replace('/archiver/home');
      await invalidateAllArchiverQueries(queryClient);

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });

  return { blockEditor, ...rest };
};
