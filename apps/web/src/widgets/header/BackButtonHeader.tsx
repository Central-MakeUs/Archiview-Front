'use client';

import { useRouter } from 'next/navigation';
import { Header } from './Header';
import { BackArrow } from '@/shared/ui/icon';

interface IBackButtonHeader {
  title: string;
  replaceTo?: string;
}
export const BackButtonHeader = ({ title, replaceTo }: IBackButtonHeader) => {
  const router = useRouter();

  const handleBack = () => {
    if (replaceTo) {
      router.replace(replaceTo);
      return;
    }

    router.back();
  };

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
