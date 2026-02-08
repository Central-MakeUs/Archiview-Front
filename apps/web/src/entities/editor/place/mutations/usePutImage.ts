import { useMutation } from '@tanstack/react-query';
import { editorPlacePost } from '../api/editorPlace-post';

export interface IPutImageParams {
  uploadUrl: string;
  file: File;
}

export const usePutImage = () => {
  const { mutate: putImage, isPending } = useMutation({
    mutationFn: ({ uploadUrl, file }: IPutImageParams) =>
      editorPlacePost.putImage(uploadUrl, file),
  });
  return { putImage, isPending };
};
