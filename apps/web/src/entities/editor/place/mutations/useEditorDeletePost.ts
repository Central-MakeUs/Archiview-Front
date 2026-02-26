'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editorPlaceDelete } from '../api/editorPlace-delete';
import { toast } from 'sonner';
import { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { useRouter } from 'next/navigation';
import { editorKeys } from '@/shared/lib/query-keys/keys/editor';

export const useEditorDeletePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteEditorPost } = useMutation({
    mutationFn: editorPlaceDelete.deletePlace,
    onSuccess: async () => {
      toast.success('게시글이 성공적으로 삭제 되었습니다');
      await queryClient.invalidateQueries({ queryKey: editorKeys.getMyPlaceList._def });
      await queryClient.invalidateQueries({ queryKey: editorKeys.getMyPlaceDetail._def });
      await queryClient.invalidateQueries({ queryKey: editorKeys.getInsightSummery._def });
      router.push('/editor/home');
    },
    onError: (error: ExtendedKyHttpError) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });

  return { deleteEditorPost };
};
