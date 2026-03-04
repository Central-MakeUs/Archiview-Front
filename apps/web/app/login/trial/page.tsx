import { PageTransition } from '@/app/providers/PageTransition';
import { TrialPage, metadata } from '@/pages/login/trial';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/login/trial">
      <TrialPage />
    </PageTransition>
  );
}
