import { PageTransition } from '@/app/providers/PageTransition';
import { EditProfilePage } from '@/pages/mypage/edit';

export default function Page(): React.ReactNode {
  return (
    <PageTransition id="/mypage/edit-profile">
      <EditProfilePage />
    </PageTransition>
  );
}
