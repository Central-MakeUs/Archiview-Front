import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/categories-get';
import { commonKeys } from '@/shared/lib/query-keys';

export const useGetCategories = () => {
  const { data: categories } = useQuery({
    queryKey: commonKeys.getCategories.all.queryKey,
    queryFn: () => getCategories(),
  });
  return categories;
};
