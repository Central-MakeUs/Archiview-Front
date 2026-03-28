import React from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { EditorProfilePage, metadata } from '@/pages/archiver/editor-profile';

export { metadata };

export default function Page({ params }: { params: Promise<{ editorId: string }> }) {
  const { editorId } = React.use(params);

  return (
    <PageTransition id={`/archiver/editor-profile/${editorId}`}>
      <EditorProfilePage editorId={editorId} />
    </PageTransition>
  );
}
