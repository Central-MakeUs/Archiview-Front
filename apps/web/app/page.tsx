import { RootRedirectPage } from '@/app/ui/RootRedirectPage';
import { SsgoiTransition } from '@ssgoi/react';

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/">
      <RootRedirectPage />
    </SsgoiTransition>
  );
}
