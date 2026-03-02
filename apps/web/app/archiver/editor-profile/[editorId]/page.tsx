import React from 'react';
import { SsgoiTransition } from '@ssgoi/react';

import { EditorProfilePage, metadata } from '@/pages/archiver/editor-profile';

export { metadata };

export default function Page({ params }: { params: Promise<{ editorId: string }> }) {
  const { editorId } = React.use(params);

  return (
    <SsgoiTransition id={`/archiver/editor-profile/${editorId}`}>
      <EditorProfilePage editorId={editorId} />
    </SsgoiTransition>
  );
}
