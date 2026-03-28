import { PageTransition } from '@/app/providers/PageTransition';
import { RegisterFinishPage, metadata } from '@/pages/register-finish';

export { metadata };

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ role: 'EDITOR' | 'ARCHIVER' }>;
}): React.ReactElement {
  return (
    <PageTransition id="/register-finish">
      <RegisterFinishPage searchParams={searchParams} />
    </PageTransition>
  );
}
