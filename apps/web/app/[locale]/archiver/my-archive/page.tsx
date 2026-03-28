import { PageTransition } from '@/app/providers/PageTransition';
import { MyArchiverPage, metadata } from '@/pages/archiver/my-archive';

export { metadata };

export default function Page(): React.ReactElement {
  return (
    <PageTransition id="/archiver/my-archive">
      <MyArchiverPage />
    </PageTransition>
  );
}
