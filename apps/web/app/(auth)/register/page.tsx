import { SsgoiTransition } from '@ssgoi/react';

import { RegisterPage, metadata } from '@/pages/register';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/register">
      <RegisterPage />
    </SsgoiTransition>
  );
}
