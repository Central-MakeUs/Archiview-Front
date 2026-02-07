import { useMutation } from '@tanstack/react-query';
import { editorPlacePost } from '../api/editorPlace-post';

export const useEditorGetPresignedUrl = () => {
  const { mutate: getPresignedUrl, isPending } = useMutation({
    mutationFn: editorPlacePost.getPresignedUrl,
    onSuccess: () => {
      console.log('업로드 URL 조회 성공');
    },
    onError: () => {
      console.log('업로드 URL 조회 실패');
    },
  });
  return { getPresignedUrl, isPending };
};
