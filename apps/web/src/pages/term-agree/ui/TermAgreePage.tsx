'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { useAuth } from '@/entities/auth/hooks/useAuth';

export const TermAgreePage = () => {
  const router = useRouter();

  useAuth();

  return (
    <div>
      <Button onClick={() => router.push('register')}>동의</Button>
    </div>
  );
};
