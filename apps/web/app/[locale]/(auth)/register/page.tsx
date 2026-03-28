import { PageTransition } from '@/app/providers/PageTransition';
import { RegisterPage, metadata } from '@/pages/register';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/register">
      <RegisterPage />
    </PageTransition>
  );
}
