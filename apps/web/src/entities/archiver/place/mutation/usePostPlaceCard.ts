import { toast } from 'sonner';

import type { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverPlacePost } from '../api/archiverPlace-post';
import type { IPostPlaceRequest, IIPostPlaceResponseDTO } from '../model/archiverPlace.type';

type PostPlaceVariables = IPostPlaceRequest & { placeId: number; useMock?: boolean };

interface IUsePostPlaceCardOptions {
  onSuccess?: (data: IIPostPlaceResponseDTO, variables: PostPlaceVariables) => void;
  onError?: (error: ExtendedKyHttpError, variables: PostPlaceVariables) => void;
}

export const usePostPlaceCardMutation = (options?: IUsePostPlaceCardOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IIPostPlaceResponseDTO, ExtendedKyHttpError, PostPlaceVariables>({
    mutationFn: archiverPlacePost.postPlaceCard,

    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: archiverKeys.getPlaceDetail.applyFilters({
          placeId: variables.placeId,
          useMock: variables.useMock,
        }).queryKey,
        exact: true,
      });

      options?.onSuccess?.(data, variables);
    },

    onError: (error, variables) => {
      options?.onError?.(error, variables);
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },

    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: archiverKeys.getArchivePlaces.applyFilters({ useMock: variables.useMock })
          .queryKey,
        exact: true,
      });
    },
  });

  return {
    postPlaceCard: mutation.mutate,
    postPlaceCardAsync: mutation.mutateAsync,
    ...mutation, // isPending, data, error 등
  };
};
