import { toast } from 'sonner';
import { editorPlacePost } from '../api/editorPlace-post';
import { useMutation } from '@tanstack/react-query';

export const useEditorCreatePost = () => {
  const { mutate: createEditorPost } = useMutation({
    mutationFn: editorPlacePost.createEditorPost,
    onSuccess: () => {
      toast.success('게시글 생성 성공');
    },
    onError: () => {
      toast.error('게시글 생성 실패');
    },
  });
  return { createEditorPost };
};
