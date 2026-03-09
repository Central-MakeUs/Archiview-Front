import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { PageTransition } from '@/app/providers/PageTransition';
import { MyPage, metadata } from '@/pages/mypage';
import { archiverKeys, editorKeys } from '@/shared/lib/query-keys';
import { COOKIE_KEYS, type StoredUserRole } from '@/shared/constants/cookies';
import { archiverProfileServerGet } from '@/entities/archiver/profile/api/archiverProfile-server-get';
import { editorProfileServerGet } from '@/entities/editor/profile/api/editorProfile-server-get';

export { metadata };

const isStoredUserRole = (value: string | undefined): value is StoredUserRole => {
  return value === 'GUEST' || value === 'ARCHIVER' || value === 'EDITOR';
};

export default async function MyPageRoute(): Promise<React.ReactNode> {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get(COOKIE_KEYS.role)?.value;
  const role = isStoredUserRole(roleCookie) ? roleCookie : undefined;

  const prefetchTasks =
    role === 'EDITOR'
      ? [
          queryClient.prefetchQuery({
            queryKey: editorKeys.getEditorMeProfile.all.queryKey,
            queryFn: () => editorProfileServerGet.getEditorMeProfile(),
          }),
        ]
      : role === 'ARCHIVER'
        ? [
            queryClient.prefetchQuery({
              queryKey: archiverKeys.getMyProfile.applyFilters({ useMock: false }).queryKey,
              queryFn: () => archiverProfileServerGet.getMyProfile({ useMock: false }),
            }),
          ]
        : [];

  await Promise.allSettled(prefetchTasks);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTransition id="/mypage">
        <Suspense fallback={null}>
          <MyPage />
        </Suspense>
      </PageTransition>
    </HydrationBoundary>
  );
}
