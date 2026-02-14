import { Suspense } from 'react';

import { MyPage, metadata } from '@/pages/mypage';

export { metadata };

export default function MyPageRoute(): React.ReactNode {
  return (
    <Suspense fallback={null}>
      <MyPage />
    </Suspense>
  );
}
