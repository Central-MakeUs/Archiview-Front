import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import type { IArchivePlacesResponseDTO } from '../model/archiverPlace.type';
import { archiverPlaceGet } from '../api/archiverPlace-get';

export const useGetMyArchives = (params?: { useMock?: boolean }) => {
  return useQuery<IArchivePlacesResponseDTO>({
    queryKey: archiverKeys.getArchivePlaces.applyFilters(params).queryKey,
    queryFn: () => archiverPlaceGet.getArchivePlaces(params ?? {}),
  });
};
