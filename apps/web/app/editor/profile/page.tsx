import React from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { EditorProfilePage, metadata } from '@/pages/editor/profile';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/editor/profile">
      <EditorProfilePage />
    </PageTransition>
  );
}
