import { editorPlacePost } from '../api/editorPlace-post';
import { useMutation } from '@tanstack/react-query';

export const useEditorPlacePost = () => {
  const { mutate: createEditorPost } = useMutation({
    mutationFn: editorPlacePost.createEditorPost,
    onSuccess: () => {
      console.log('게시글 생성 성공');
    },
    onError: () => {
      console.log('게시글 생성 실패');
    },
  });
  return { createEditorPost };
};
