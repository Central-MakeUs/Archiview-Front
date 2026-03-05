import { Suspense } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { PageTransition } from '@/app/providers/PageTransition';
import { MyPage, metadata } from '@/pages/mypage';
import { archiverKeys, editorKeys } from '@/shared/lib/query-keys';
import { archiverProfileServerGet } from '@/entities/archiver/profile/api/archiverProfile-server-get';
import { editorProfileServerGet } from '@/entities/editor/profile/api/editorProfile-server-get';

export { metadata };

export default async function MyPageRoute(): Promise<React.ReactNode> {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: archiverKeys.getMyProfile.applyFilters({ useMock: false }).queryKey,
      queryFn: () => archiverProfileServerGet.getMyProfile({ useMock: false }),
    }),
    queryClient.prefetchQuery({
      queryKey: editorKeys.getEditorMeProfile.all.queryKey,
      queryFn: () => editorProfileServerGet.getEditorMeProfile(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <MyPage />
      </Suspense>
    </HydrationBoundary>
  );
}
