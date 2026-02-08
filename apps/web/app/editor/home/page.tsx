import { Suspense } from 'react';
import { EditorHomePage, metadata } from '@/pages/editor/home';

export { metadata };

export default function EditorHomeRoute(): React.ReactNode {
  return (
    <Suspense fallback={null}>
      <EditorHomePage />
    </Suspense>
  );
}
