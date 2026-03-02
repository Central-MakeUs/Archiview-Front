import { Suspense } from 'react';
import { SsgoiTransition } from '@ssgoi/react';
import { EditorHomePage, metadata } from '@/pages/editor/home';

export { metadata };

export default function EditorHomeRoute(): React.ReactNode {
  return (
    <SsgoiTransition id="/editor/home">
      <Suspense fallback={null}>
        <EditorHomePage />
      </Suspense>
    </SsgoiTransition>
  );
}
