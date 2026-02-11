'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Card } from '@/shared/ui/common/Card/Card';
import { Button } from '@/shared/ui/button';
import { authPost } from '@/entities/auth/api/auth-post';

type Role = 'EDITOR' | 'ARCHIVER';

export const RoleSelectSection = () => {
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();
  const buttonVariant = role ? 'contained' : 'outlined';

  const buttonLabel = role
    ? role === 'EDITOR'
      ? '에디터로 가입하기'
      : '아카이버로 가입하기'
    : '가입하기';

  const handleNext = async () => {
    if (!role) return;

    switch (role) {
      case 'ARCHIVER': {
        try {
          await authPost.register({ role });
          router.push(`/register-finish?role=${role}`);
        } catch (e) {
          // TODO: 토스트/에러 처리
          console.error(e);
        }
        break;
      }

      case 'EDITOR':
        router.push('/term-agree-editor');
        break;
    }
  };

  return (
    <div className="pt-11.5 flex justify-between h-full flex-col">
      <div className="flex flex-col h-full gap-4">
        {/* 에디터 */}
        <Card selected={role === 'EDITOR'} onClick={() => setRole('EDITOR')} className="p-5">
          <div className="flex flex-1 flex-col gap-2">
            <span className="inline-flex w-fit rounded-full bg-primary-40 px-3 py-1 caption-12-semibold text-white">
              에디터
            </span>

            <p className="body-16-semibold text-neutral-90">
              내가 남긴 장소 기록이
              <br />
              어떤 반응을 얻는지 확인해보세요
            </p>

            <ul className="list-disc pl-5 py-2 body-14-regular text-neutral-40">
              <li>보고 바로 저장</li>
              <li>지도에서 한눈에</li>
              <li>자동으로 정리</li>
            </ul>
          </div>
        </Card>

        {/* 아카이버 */}
        <Card selected={role === 'ARCHIVER'} onClick={() => setRole('ARCHIVER')} className="p-5">
          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit rounded-full bg-neutral-90 px-3 py-1 caption-12-semibold text-white">
              아카이버
            </span>

            <p className="body-16-semibold text-neutral-90">
              인스타그램에서 본 맛집을
              <br />내 지도에 차곡차곡 모아보세요
            </p>

            <ul className="list-disc pl-5 py-2 body-14-regular text-neutral-40">
              <li>보고 바로 저장</li>
              <li>지도에서 한눈에</li>
              <li>자동으로 정리</li>
            </ul>
          </div>
        </Card>
      </div>

      <div className="flex flex-col items-center mb-4">
        <Button
          variant={buttonVariant}
          onClick={handleNext}
          className={[
            'w-full body-16-semibold',
            role ? '' : 'bg-neutral-20 text-neutral-40 border-none',
          ].join(' ')}
        >
          {buttonLabel}
        </Button>

        <p className="text-center caption-12-semibold text-neutral-50">
          이미 가입했나요?{' '}
          <Link href="/login" className="underline underline-offset-2">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};
