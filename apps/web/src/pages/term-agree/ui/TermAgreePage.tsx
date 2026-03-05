'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { useAuth } from '@/entities/auth/hooks/useAuth';

import { CheckItem } from './CheckItem';

export const TermAgreePage = () => {
  const router = useRouter();

  const [service, setService] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [location, setLocation] = useState(false);

  const allChecked = useMemo(() => service && privacy && location, [service, privacy, location]);

  const onToggleAll = (checked: boolean) => {
    setService(checked);
    setPrivacy(checked);
    setLocation(checked);
  };

  useAuth();

  return (
    <div className="flex h-full justify-between flex-col gap-2 pb-5 px-5">
      <div>
        <p className="heading-24-semibold mb-21 mt-9.5">
          아카이뷰 약관을 확인 하고
          <br /> 동의해주세요.
        </p>
        <CheckItem checked={allChecked} onCheckedChange={onToggleAll} className="bg-[#F5F6FA] mb-1">
          전체 약관에 동의합니다
        </CheckItem>
        <CheckItem checked={service} onCheckedChange={setService}>
          <span className="text-neutral-40 mr-1">(필수)</span> 서비스 이용약관
        </CheckItem>
        <CheckItem checked={privacy} onCheckedChange={setPrivacy}>
          <span className="text-neutral-40 mr-1">(필수)</span> 개인정보 수집 및 이용동의
        </CheckItem>
        <CheckItem checked={location} onCheckedChange={setLocation}>
          <span className="text-neutral-40 mr-1">(필수)</span> 위치 기반 서비스 이용동의
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
