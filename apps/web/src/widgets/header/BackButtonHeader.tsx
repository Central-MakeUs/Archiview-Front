'use client';

import { Link, useRouter } from '@/shared/lib/i18n/navigation';
import { Header } from './Header';
import { BackArrow } from '@/shared/ui/icon';

interface IBackButtonHeader {
  title: string;
  replaceTo?: string;
}
export const BackButtonHeader = ({ title, replaceTo }: IBackButtonHeader) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (replaceTo) {
    return (
      <Header
        title={title}
        left={
          <Link
            href={replaceTo}
            replace
            aria-label="뒤로가기"
            className="inline-flex items-center justify-center"
          >
            <BackArrow />
          </Link>
        }
      />
    );
  }

  return (
    <Header
      title={title}
      left={
        <button type="button" aria-label="뒤로가기" onClick={handleBack}>
          <BackArrow />
        </button>
      }
    />
  );
};
