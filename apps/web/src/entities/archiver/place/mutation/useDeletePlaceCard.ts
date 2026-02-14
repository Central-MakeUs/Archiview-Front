import { toast } from 'sonner';

import type { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverPlaceDelete } from '../api/archiverPlace-delete';
import type { IDeletePlaceResponseDTO } from '../model/archiverPlace.type';

type DeletePlaceVariables = { postPlaceId: number; placeId: number; useMock?: boolean };

interface IUseDeletePlaceCardOptions {
  onSuccess?: (data: IDeletePlaceResponseDTO, variables: DeletePlaceVariables) => void;
  onError?: (error: ExtendedKyHttpError, variables: DeletePlaceVariables) => void;
}

export const useDeletePlaceCardMutation = (options?: IUseDeletePlaceCardOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IDeletePlaceResponseDTO, ExtendedKyHttpError, DeletePlaceVariables>({
    mutationFn: ({ postPlaceId }) => archiverPlaceDelete.deletePlace({ postPlaceId }),

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
    deletePlaceCard: mutation.mutate,
    deletePlaceCardAsync: mutation.mutateAsync,
    ...mutation,
  };
};
