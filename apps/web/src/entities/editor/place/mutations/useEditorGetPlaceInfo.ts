import { editorPlaceGet } from '../api/editorPlace-get';
import { editorKeys } from '@/shared/lib/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useEditorGetPlaceInfo = (placeId: number) => {
  const {
    data: placeInfoData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: editorKeys.getMyPlaceDetail.applyFilters({ placeId: placeId, useMock: true })
      .queryKey,
    queryFn: () => editorPlaceGet.getMyPlaceDetail(placeId),
  });
  return { placeInfoData, isLoading, isError, error };
};
