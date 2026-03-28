import { PageTransition } from '@/app/providers/PageTransition';
import { BlockedEditorPage, metadata } from '@/pages/blocked-editor';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/blocked-editor">
      <BlockedEditorPage />
    </PageTransition>
  );
}
