import { PageTransition } from '@/app/providers/PageTransition';
import { RegisterEditorPage, metadata } from '@/pages/register-editor';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/register-editor">
      <RegisterEditorPage />
    </PageTransition>
  );
}
