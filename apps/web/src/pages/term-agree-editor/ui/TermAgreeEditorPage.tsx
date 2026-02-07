'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';

export const TermAgreeEditorPage = () => {
  const router = useRouter();

  return (
    <div>
      {' '}
      <Button onClick={() => router.push(`/register-finish?role=EDITOR`)}>
        에디터 추가 약관 동의
      </Button>
    </div>
  );
};
