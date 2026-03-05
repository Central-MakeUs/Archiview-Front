import { Suspense } from 'react';

import { PageTransition } from '@/app/providers/PageTransition';
import { TermAgreeEditorPage } from '@/pages/term-agree-editor';

export { metadata } from '@/pages/term-agree-editor';

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/term-agree-editor">
      <Suspense fallback={null}>
        <TermAgreeEditorPage />
      </Suspense>
    </PageTransition>
  );
}
