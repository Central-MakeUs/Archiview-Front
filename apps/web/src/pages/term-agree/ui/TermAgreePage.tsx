'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';

export const TermAgreePage = () => {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push('register')}>동의</Button>
    </div>
  );
};
