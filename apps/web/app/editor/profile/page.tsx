import React from 'react';
import { SsgoiTransition } from '@ssgoi/react';

import { EditorProfilePage, metadata } from '@/pages/editor/profile';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/editor/profile">
      <EditorProfilePage />
    </SsgoiTransition>
  );
}
