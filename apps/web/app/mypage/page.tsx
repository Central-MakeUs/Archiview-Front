import { Suspense } from 'react';
import { SsgoiTransition } from '@ssgoi/react';

import { MyPage, metadata } from '@/pages/mypage';

export { metadata };

export default function MyPageRoute(): React.ReactNode {
  return (
    <SsgoiTransition id="/mypage">
      <Suspense fallback={null}>
        <MyPage />
      </Suspense>
    </SsgoiTransition>
  );
}
