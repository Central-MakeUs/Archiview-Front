import { RootRedirectPage } from '@/app/ui/RootRedirectPage';
import { PageTransition } from '@/app/providers/PageTransition';

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/">
      <RootRedirectPage />
    </PageTransition>
  );
}
