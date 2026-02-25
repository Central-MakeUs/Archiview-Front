import { archiverKeys } from '@/shared/lib/query-keys/keys/archiver';
import { useQuery } from '@tanstack/react-query';

import { archiverPlaceGet } from '../api/archiverPlace-get';

export const useGetEditorPlace = (params: {
  userId: string;
  placeId: number;
  useMock?: boolean;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: archiverKeys.getEditorPlace.applyFilters({
      userId: params.userId,
      placeId: params.placeId,
      useMock: params.useMock ?? false,
    }).queryKey,
    queryFn: () =>
      archiverPlaceGet.getEditorPlace({
        userId: params.userId,
        placeId: params.placeId,
        useMock: params.useMock ?? false,
      }),
    enabled: params.enabled ?? true,
  });
};
