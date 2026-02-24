import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverPlaceGet } from '../api/archiverPlace-get';
import type { IArchivePinsResponseDTO } from '../model/archiverPlace.type';

interface IParams {
  filter?: 'ALL' | 'NEARBY';
  latitude?: number;
  longitude?: number;
  useMock?: boolean;
}

export const useGetArchivePins = (params: IParams) => {
  const filter = params?.filter ?? 'ALL';
  const latitude = params.latitude;
  const longitude = params.longitude;
  const useMock = params?.useMock;
  const hasNearbyCoords = Number.isFinite(latitude) && Number.isFinite(longitude);

  return useQuery<IArchivePinsResponseDTO>({
    queryKey: archiverKeys.getArchivePins.applyFilters({
      filter,
      latitude,
      longitude,
      useMock,
    }).queryKey,
    queryFn: () =>
      archiverPlaceGet.getArchivePins({
        filter,
        latitude,
        longitude,
        useMock,
      }),
    enabled: filter === 'ALL' || hasNearbyCoords,
  });
};
