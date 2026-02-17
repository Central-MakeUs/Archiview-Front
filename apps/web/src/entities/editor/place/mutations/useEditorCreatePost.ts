import type { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { editorPlacePost } from '../api/editorPlace-post';
import { ICreateEditorPostResponseDTO } from '../model/editorPlace.type';
import { editorKeys } from '@/shared/lib/query-keys';

interface IUseEditorCreatePostOptions {
  onSuccess?: (data: ICreateEditorPostResponseDTO) => void;
}

export const useEditorCreatePost = (options?: IUseEditorCreatePostOptions) => {
  const queryClient = useQueryClient();
  const { mutate: createEditorPost } = useMutation({
    mutationFn: editorPlacePost.createEditorPost,
    onSuccess: async (data: ICreateEditorPostResponseDTO) => {
      toast.success('게시글 생성 성공');
      await queryClient.invalidateQueries({ queryKey: editorKeys.getMyPlaceList._def });
      await queryClient.invalidateQueries({ queryKey: editorKeys.getInsightSummery._def });
      options?.onSuccess?.(data);
    },
    onError: (error: ExtendedKyHttpError) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });

  return { createEditorPost };
};
