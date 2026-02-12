import type { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { archiverPlacePost } from '../api/archiverPlace-post';
import type { IPostPlaceRequest, IIPostPlaceResponseDTO } from '../model/archiverPlace.type';

interface IUsePostPlaceCardOptions {
  onSuccess?: (data: IIPostPlaceResponseDTO, variables: IPostPlaceRequest) => void;
}

export const usePostPlaceCardMutation = (options?: IUsePostPlaceCardOptions) => {
  const mutation = useMutation<IIPostPlaceResponseDTO, ExtendedKyHttpError, IPostPlaceRequest>({
    mutationFn: archiverPlacePost.postPlaceCard,

    onSuccess: (data, variables) => {
      options?.onSuccess?.(data, variables);
    },

    onError: (error) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });

  return {
    postPlaceCard: mutation.mutate,
    postPlaceCardAsync: mutation.mutateAsync,
    ...mutation, // isPending, data, error 등
  };
};
