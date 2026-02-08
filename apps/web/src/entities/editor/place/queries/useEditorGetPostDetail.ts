import { editorKeys } from '@/shared/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import { editorPlaceGet } from '../api/editorPlace-get';

export const useEditorGetPostDetail = ({ placeId }: { placeId: number }) => {
  const { data: postDetailData, isFetching: isFetchingPostDetail } = useQuery({
    queryKey: editorKeys.getInsightPlaceDetail.applyFilters({ placeId: placeId }).queryKey,
    queryFn: () => editorPlaceGet.getDetailPlace(placeId),
  });
  return { postDetailData, isFetchingPostDetail };
};
