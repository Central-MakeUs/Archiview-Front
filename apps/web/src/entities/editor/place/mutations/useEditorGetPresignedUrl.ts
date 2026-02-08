import { useMutation } from '@tanstack/react-query';
import { editorPlacePost } from '../api/editorPlace-post';

export const useEditorGetPresignedUrl = () => {
  const { mutate: getPresignedUrl, isPending } = useMutation({
    mutationFn: editorPlacePost.getPresignedUrl,
  });
  return { getPresignedUrl, isPending };
};
