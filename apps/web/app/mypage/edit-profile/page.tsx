import { SsgoiTransition } from '@ssgoi/react';

import { EditProfilePage } from '@/pages/mypage/edit';

export default function Page(): React.ReactNode {
  return (
    <SsgoiTransition id="/mypage/edit-profile">
      <EditProfilePage />
    </SsgoiTransition>
  );
}
