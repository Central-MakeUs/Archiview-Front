import { useQuery } from '@tanstack/react-query';

import { archiverKeys } from '@/shared/lib/query-keys';

import { archiverProfileGet } from '../api/archiverProfile-get';

interface IParams {
  useMock?: boolean;
}

export const useGetEditorTrusted = (params?: IParams) => {
  return useQuery({
    queryKey: archiverKeys.getEditorsTrusted.applyFilters(params).queryKey,
    queryFn: () => archiverProfileGet.getEditorsTrusted(params ?? {}),
  });
};
