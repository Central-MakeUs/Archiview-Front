'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { useAuth } from '@/entities/auth/hooks/useAuth';
import { authPost } from '@/entities/auth/api/auth-post';
import { CheckItem } from '@/pages/term-agree/ui/CheckItem';

export const TermAgreeEditorPage = () => {
  const router = useRouter();

  const [copyWrite, setCopyWrite] = useState(false);
  const [guideLine, setGuideLine] = useState(false);

  const allChecked = useMemo(() => copyWrite && guideLine, [copyWrite, guideLine]);

  const onToggleAll = (checked: boolean) => {
    setCopyWrite(checked);
    setGuideLine(checked);
  };

  useAuth();

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
    <div className="flex h-full justify-between flex-col gap-2 pb-5 px-5">
      <div>
        <p className="heading-24-semibold mb-21 mt-9.5">
          에디터로 활동하시려면
          <br /> 추가 약관동의가 필요해요
        </p>
        <CheckItem checked={allChecked} onCheckedChange={onToggleAll} className="bg-[#F5F6FA] mb-1">
          전체 약관에 동의합니다
        </CheckItem>
        <CheckItem checked={copyWrite} onCheckedChange={setCopyWrite}>
          <span className="text-neutral-40 mr-1">(필수)</span> 에디터 운영정책 및 저작권 안내
        </CheckItem>
        <CheckItem checked={guideLine} onCheckedChange={setGuideLine}>
          <span className="text-neutral-40 mr-1">(필수)</span> 커뮤니티 가이드라인 준수 서약
        </CheckItem>
      </div>
      <Button
        onClick={() => router.push('register')}
        className={allChecked ? 'w-full' : 'w-full bg-neutral-20 text-neutral-40 border-none'}
      >
        동의
      </Button>
    </div>
  );
};
