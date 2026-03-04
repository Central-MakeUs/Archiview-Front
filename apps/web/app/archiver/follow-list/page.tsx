import { PageTransition } from '@/app/providers/PageTransition';
import { FollowListPage, metadata } from '@/pages/archiver/follow-list';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/archiver/follow-list">
      <FollowListPage />
    </PageTransition>
  );
}
