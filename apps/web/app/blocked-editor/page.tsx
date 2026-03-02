import { SsgoiTransition } from '@ssgoi/react';

import { BlockedEditorPage, metadata } from '@/pages/blocked-editor';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/blocked-editor">
      <BlockedEditorPage />
    </SsgoiTransition>
  );
}
