import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverProfileGet } from '../api/archiverProfile-get';
import { IEditorPlacePinsResponseDTO } from '../model/archiverProfile.type';

export const useGetEditorPlacePins = (params: {
  editorId: string;
  filter?: 'ALL' | 'NEARBY';
  useMock?: boolean;
}) => {
  return useQuery<IEditorPlacePinsResponseDTO>({
    queryKey: archiverKeys.getEditorPlacePins.applyFilters({
      editorId: params.editorId,
      filter: params.filter,
      useMock: params.useMock,
    }).queryKey,
    queryFn: () =>
      archiverProfileGet.getEditorPlacePins({
        editorId: params.editorId,
        filter: params.filter ?? 'ALL',
        useMock: params.useMock ?? false,
      }),
    enabled: Boolean(params.editorId) && params.editorId !== 'undefined',
  });
};
