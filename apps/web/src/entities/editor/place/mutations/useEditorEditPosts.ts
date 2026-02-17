import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { editorPlacePost } from '../api/editorPlace-post';
import { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { IEditEditorPostRequest } from '../model/editorPlace.type';
import { editorKeys } from '@/shared/lib/query-keys';

export const useEditorEditPosts = () => {
  const queryClient = useQueryClient();
  const { mutate: editEditorPost } = useMutation({
    mutationFn: ({ postId, body }: { postId: number; body: IEditEditorPostRequest }) =>
      editorPlacePost.editPosts(postId, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: editorKeys.getMyPlaceList._def });
      await queryClient.invalidateQueries({ queryKey: editorKeys.getInsightSummery._def });
      toast.success('게시물을 성공적으로 수정 하였습니다');
    },
    onError: (error: ExtendedKyHttpError) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });

  return { editEditorPost };
};
