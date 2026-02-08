import type { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { editorPlacePost } from '../api/editorPlace-post';
import { ICreateEditorPostResponseDTO } from '../model/editorPlace.type';

interface IUseEditorCreatePostOptions {
  onSuccess?: (data: ICreateEditorPostResponseDTO) => void;
}

export const useEditorCreatePost = (options?: IUseEditorCreatePostOptions) => {
  const { mutate: createEditorPost } = useMutation({
    mutationFn: editorPlacePost.createEditorPost,
    onSuccess: (data: ICreateEditorPostResponseDTO) => {
      console.log(data);
      toast.success('게시글 생성 성공');
      options?.onSuccess?.(data);
    },
    onError: (error: ExtendedKyHttpError) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });

  return { createEditorPost };
};
