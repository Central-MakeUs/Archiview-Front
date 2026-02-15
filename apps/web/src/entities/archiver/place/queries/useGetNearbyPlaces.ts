import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverPlaceGet } from '../api/archiverPlace-get';
import type { INearPlaceResponseDTO } from '../model/archiverPlace.type';

interface IParams {
  latitude: number;
  longitude: number;
  useMock?: boolean;
}

export const useGetNearbyPlaces = ({ latitude, longitude, useMock }: IParams) => {
  return useQuery<INearPlaceResponseDTO>({
    queryKey: archiverKeys.getNearbyPlaces.applyFilters({ latitude, longitude, useMock }).queryKey,
    queryFn: () => archiverPlaceGet.getNearbyPlaces({ latitude, longitude, useMock }),
    enabled: Number.isFinite(latitude) && Number.isFinite(longitude),
  });
};
