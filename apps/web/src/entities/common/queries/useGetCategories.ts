'use client';

import { useQuery } from '@tanstack/react-query';
import { commonKeys } from '@/shared/lib/query-keys';
import { getCategories } from '../api/categories-get';

export const useGetCategories = () => {
  return useQuery({
    queryKey: commonKeys.getCategories.all.queryKey,
    queryFn: () => getCategories(),
    select: (data) => data?.data?.categories.sort((a, b) => a.id - b.id),
  });
};
