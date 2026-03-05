import { Suspense } from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { MyPage, metadata } from '@/pages/mypage';

export { metadata };

export default function MyPageRoute(): React.ReactNode {
  return (
    <PageTransition id="/mypage">
      <Suspense fallback={null}>
        <MyPage />
      </Suspense>
    </PageTransition>
  );
}
