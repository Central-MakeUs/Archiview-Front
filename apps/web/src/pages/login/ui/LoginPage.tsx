'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/shared/ui/button';

import { OnboardingCarousel } from './OnboardingCarousel';
import { KakaoButton } from './SocialLoginButton';

const ONBOARDING_TEXT: Array<{ title: string; description: string }> = [
  {
    title: '저장만 해둔 맛집, 어디 있었지?',
    description: '인스타에 흩어진 맛집 정보들,\n이제 따로 찾지 말고 한 번에 모아보세요.',
  },
  {
    title: '저장한 순간, 바로 길찾기까지',
    description: '에디터가 남긴 맛집을\n지도에서 보고, 바로 찾아갈 수 있어요.',
  },
  {
    title: '내 콘텐츠, 숫자로 한눈에',
    description: '저장 수 · 조회 반응 · 방문 흐름까지\n내 영향력을 시각적으로 확인해요.',
  },
];

export const LoginPage = () => {
  const [step, setStep] = useState<'onboarding' | 'login'>('onboarding');

  return (
    <div className="flex h-full flex-col bg-white">
      {step === 'onboarding' && (
        <>
          <OnboardingCarousel items={ONBOARDING_TEXT}>
            {/* 나중에 슬라이드 바꾸기 */}
            <div className="flex h-120 items-center justify-center">
              <Image src="/images/TestImage.png" alt="온보딩 이미지 1" width={240} height={240} />
            </div>

            <div className="flex h-120 items-center justify-center">
              <Image src="/images/TestImage.png" alt="온보딩 이미지 2" width={240} height={240} />
            </div>

            <div className="flex h-120 items-center justify-center">
              <Image src="/images/TestImage.png" alt="온보딩 이미지 3" width={240} height={240} />
            </div>
          </OnboardingCarousel>
          <div className="px-5 pb-8">
            <Button className="w-full bg-primary-40" onClick={() => setStep('login')}>
              다음
            </Button>
            <p className="text-center caption-12-semibold text-neutral-50 mt-2">
              이미 가입했나요?{' '}
              <button onClick={() => setStep('login')} className="underline underline-offset-2">
                로그인
              </button>
            </p>
          </div>
        </>
      )}

      {step === 'login' && (
        <>
          <div className="fixed bottom-10 left-5 right-5">
            <KakaoButton />
            <Button>애플로그인 </Button>
            <Button className="w-full mt-13">회원가입</Button>
          </div>
        </>
      )}
    </div>
  );
};
