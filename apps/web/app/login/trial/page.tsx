import { SsgoiTransition } from '@ssgoi/react';

import { TrialPage, metadata } from '@/pages/login/trial';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/login/trial">
      <TrialPage />
    </SsgoiTransition>
  );
}
