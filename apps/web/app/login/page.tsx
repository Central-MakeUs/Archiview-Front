import { SsgoiTransition } from '@ssgoi/react';

import { LoginPage, metadata } from '@/pages/login';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/login">
      <LoginPage />
    </SsgoiTransition>
  );
}
