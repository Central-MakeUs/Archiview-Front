import { Suspense } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { PageTransition } from '@/app/providers/PageTransition';
import { ArchiverHomePage, metadata } from '@/pages/archiver/home';
import { archiverKeys } from '@/shared/lib/query-keys';
import { CATEGORIES } from '@/shared/constants/category';
import { archiverProfileServerGet } from '@/entities/archiver/profile/api/archiverProfile-server-get';
import { archiverPlaceServerGet } from '@/entities/archiver/place/api/archiverPlace-server-get';
import { archiverCategoryServerGet } from '@/entities/archiver/category/api/archiverCategory-server-get';

export { metadata };

export default async function Page(): Promise<React.ReactElement> {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: archiverKeys.getMyProfile.applyFilters({ useMock: false }).queryKey,
      queryFn: () => archiverProfileServerGet.getMyProfile({ useMock: false }),
    }),
    queryClient.prefetchQuery({
      queryKey: archiverKeys.getHotPlaces.applyFilters({ useMock: false }).queryKey,
      queryFn: () => archiverPlaceServerGet.getHotPlaces({ useMock: false }),
    }),
    queryClient.prefetchQuery({
      queryKey: archiverKeys.getEditorsTrusted.applyFilters({ useMock: false }).queryKey,
      queryFn: () => archiverProfileServerGet.getEditorsTrusted({ useMock: false }),
    }),
    ...CATEGORIES.map((c) =>
      queryClient.prefetchQuery({
        queryKey: archiverKeys.getCategoryPlaceList.applyFilters({
          categoryId: c.id,
          useMock: false,
        }).queryKey,
        queryFn: () =>
          archiverCategoryServerGet.getCategoryPlaceList({ categoryId: c.id, useMock: false }),
      }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTransition id="/archiver/home">
        <Suspense fallback={null}>
          <ArchiverHomePage />
        </Suspense>
      </PageTransition>
    </HydrationBoundary>
  );
}
