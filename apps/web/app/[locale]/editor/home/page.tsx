import { Suspense } from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { EditorHomePage, EditorHomeSkeleton, metadata } from '@/pages/editor/home';

export { metadata };

export default function EditorHomeRoute(): React.ReactNode {
  return (
    <PageTransition id="/editor/home">
      <Suspense fallback={<EditorHomeSkeleton />}>
        <EditorHomePage />
      </Suspense>
    </PageTransition>
  );
}
