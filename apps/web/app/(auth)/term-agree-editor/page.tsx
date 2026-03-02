import { Suspense } from 'react';
import { SsgoiTransition } from '@ssgoi/react';
import { TermAgreeEditorPage } from '@/pages/term-agree-editor';

export { metadata } from '@/pages/term-agree-editor';

export default function Page(): React.ReactElement {
  return (
    <SsgoiTransition id="/term-agree-editor">
      <Suspense fallback={null}>
        <TermAgreeEditorPage />
      </Suspense>
    </SsgoiTransition>
  );
}
