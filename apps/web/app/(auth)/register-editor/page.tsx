import { SsgoiTransition } from '@ssgoi/react';

import { RegisterEditorPage, metadata } from '@/pages/register-editor';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/register-editor">
      <RegisterEditorPage />
    </SsgoiTransition>
  );
}
