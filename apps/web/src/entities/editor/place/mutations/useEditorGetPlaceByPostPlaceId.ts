import { editorPlaceGet } from '../api/editorPlace-get';
import { editorKeys } from '@/shared/lib/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useEditorGetPlaceByPostPlaceId = (postPlaceId: number | undefined) => {
  const {
    data: placeData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: editorKeys.getPostByPlaceId.applyFilters({
      postPlaceId: postPlaceId!,
      useMock: false,
    }).queryKey,
    queryFn: () => editorPlaceGet.getPostByPlace(postPlaceId!),
    enabled: !!postPlaceId,
  });
  return { placeData, isLoading, isError, error };
};
