import { Suspense } from 'react';
import { TermAgreeEditorPage } from '@/pages/term-agree-editor';

export { metadata } from '@/pages/term-agree-editor';

export default function Page(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <TermAgreeEditorPage />
    </Suspense>
  );
}
