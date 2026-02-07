import { useQuery } from '@tanstack/react-query';

import { editorKeys } from '@/shared/lib/query-keys';

import { editorPlaceGet } from '../api/editorPlace-get';
import type { InsightPeriod } from '../model/editorPlace.type';

interface IParams {
  period?: InsightPeriod;
  useMock?: boolean;
}

export const useEditorInsightSummaryQuery = (params?: IParams) => {
  return useQuery({
    queryKey: editorKeys.getInsightSummery.applyFilters(params).queryKey,
    queryFn: () => editorPlaceGet.getInsightSummery(params ?? {}),
  });
};
