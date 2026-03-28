import React from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageTransition } from '@/app/providers/PageTransition';
import { EditorProfilePage } from '@/pages/archiver/editor-profile';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('archiverEditorProfile');
  return { title: t('metadata.title') };
}

export default function Page({ params }: { params: Promise<{ editorId: string }> }) {
  const { editorId } = React.use(params);

  return (
    <PageTransition id={`/archiver/editor-profile/${editorId}`}>
      <EditorProfilePage editorId={editorId} />
    </PageTransition>
  );
}
