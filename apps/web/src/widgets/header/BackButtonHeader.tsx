'use client';

import { useRouter } from 'next/navigation';
import { Header } from './Header';
import { BackArrow } from '@/shared/ui/icon';

interface IBackButtonHeader {
  title: string;
}
export const BackButtonHeader = ({ title }: IBackButtonHeader) => {
  const router = useRouter();

  return (
    <Header
      title={title}
      left={
        <button type="button" aria-label="뒤로가기" onClick={() => router.back()}>
          <BackArrow />
        </button>
      }
    />
  );
};
