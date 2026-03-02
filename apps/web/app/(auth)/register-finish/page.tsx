import { SsgoiTransition } from '@ssgoi/react';

import { RegisterFinishPage, metadata } from '@/pages/register-finish';

export { metadata };

type Role = 'EDITOR' | 'ARCHIVER';

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ role: Role }>;
}): React.ReactElement {
  return (
    <SsgoiTransition id="/register-finish">
      <RegisterFinishPage searchParams={searchParams} />
    </SsgoiTransition>
  );
}
