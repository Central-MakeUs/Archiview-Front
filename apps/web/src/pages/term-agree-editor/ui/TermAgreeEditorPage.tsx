'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { authPost } from '@/entities/auth/api/auth-post';

export const TermAgreeEditorPage = () => {
  const router = useRouter();

  // TODO : 추후 분리
  const handleClick = async () => {
    try {
      await authPost.register({ role: 'EDITOR' });
      router.push(`/register-finish?role=EDITOR`);
    } catch (e) {
      // TODO: 토스트/에러 처리
      console.error(e);
    }
  };

  return (
    <div>
      {' '}
      <Button onClick={handleClick}>에디터 추가 약관 동의</Button>
    </div>
  );
};
