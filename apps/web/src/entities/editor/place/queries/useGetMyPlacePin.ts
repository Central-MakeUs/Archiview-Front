import { useQuery } from '@tanstack/react-query';

import { editorKeys } from '@/shared/lib/query-keys';

import { editorPlaceGet } from '../api/editorPlace-get';
import type { IEditorMyPlacePinResponseDTO } from '../model/editorPlace.type';

interface IParams {
  filter?: 'ALL' | 'NEARBY';
  categoryId?: number;
  latitude?: number;
  longitude?: number;
  useMock?: boolean;
}

export const useGetMyPlacePin = (params?: IParams) => {
  const filter = params?.filter ?? 'ALL';
  const hasNearbyCoords = Number.isFinite(params?.latitude) && Number.isFinite(params?.longitude);

  return useQuery<IEditorMyPlacePinResponseDTO>({
    queryKey: editorKeys.getMyPlacePin.applyFilters(params).queryKey,
    queryFn: () => editorPlaceGet.getMyPlacePin(params),
    placeholderData: (previousData) => previousData,
    enabled: filter === 'ALL' || hasNearbyCoords,
  });
};
