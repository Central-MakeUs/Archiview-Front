import React from 'react';

import { EditorProfilePage, metadata } from '@/pages/archiver/editor-profile';

export { metadata };

export default function Page({ params }: { params: Promise<{ editorId: string }> }) {
  const { editorId } = React.use(params);

  return <EditorProfilePage editorId={editorId} />;
}
