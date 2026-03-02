import { SsgoiTransition } from '@ssgoi/react';

import { FollowListPage, metadata } from '@/pages/archiver/follow-list';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/archiver/follow-list">
      <FollowListPage />
    </SsgoiTransition>
  );
}
