import { PageTransition } from '@/app/providers/PageTransition';
import { LoginPage, metadata } from '@/pages/login';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/login">
      <LoginPage />
    </PageTransition>
  );
}
