import { Suspense } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { PageTransition } from '@/app/providers/PageTransition';
import { ArchiverHomePage, metadata } from '@/pages/archiver/home';
import { archiverKeys } from '@/shared/lib/query-keys';
import { archiverProfileServerGet } from '@/entities/archiver/profile/api/archiverProfile-server-get';

export { metadata };

export default async function Page(): Promise<React.ReactElement> {
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: archiverKeys.getMyProfile.applyFilters({ useMock: false }).queryKey,
      queryFn: () => archiverProfileServerGet.getMyProfile({ useMock: false }),
    }),
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
