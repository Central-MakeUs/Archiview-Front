import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverProfileGet } from '../api/archiverProfile-get';
import { IEditorPlacePinsResponseDTO } from '../model/archiverProfile.type';

export const useGetEditorPlacePins = (params: {
  editorId: string;
  filter?: 'ALL' | 'NEARBY';
  categoryId?: number;
  latitude?: number;
  longitude?: number;
  useMock?: boolean;
}) => {
  const filter = params.filter ?? 'ALL';
  const hasNearbyCoords = Number.isFinite(params.latitude) && Number.isFinite(params.longitude);

  return useQuery<IEditorPlacePinsResponseDTO>({
    queryKey: archiverKeys.getEditorPlacePins.applyFilters({
      editorId: params.editorId,
      filter,
      categoryId: params.categoryId,
      latitude: params.latitude,
      longitude: params.longitude,
      useMock: params.useMock,
    }).queryKey,
    queryFn: () =>
      archiverProfileGet.getEditorPlacePins({
        editorId: params.editorId,
        filter,
        categoryId: params.categoryId,
        latitude: params.latitude,
        longitude: params.longitude,
        useMock: params.useMock ?? false,
      }),
    enabled:
      Boolean(params.editorId) &&
      params.editorId !== 'undefined' &&
      (filter === 'ALL' || hasNearbyCoords),
  });
};
