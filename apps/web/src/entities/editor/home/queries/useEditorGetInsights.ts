import { useQuery } from '@tanstack/react-query';
import { editorHomeGet } from '../api/editorHome-get';
import { editorKeys } from '@/shared/lib/query-keys';
import { EditorInsightPlaceSort } from '../model/editorHome.type';

export const useEditorGetInsights = ({ sort = 'RECENT' }: { sort?: EditorInsightPlaceSort }) => {
  const { data: editorInsightData, isFetching: isFetchingEditorInsight } = useQuery({
    queryKey: editorKeys.getInsightPlaceList.applyFilters({ sort }).queryKey,
    queryFn: () => editorHomeGet.getEditorHome({ sort }),
  });
  return { editorInsightData, isFetchingEditorInsight };
};
