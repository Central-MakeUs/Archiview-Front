'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  isNativeMethodAvailable,
  isWebViewBridgeAvailable,
} from '@/shared/lib/native-bridge';
import {
  LOGIN_FAILURE_MESSAGES,
  useLoginMachine,
  type LoginProvider,
} from '@/shared/lib/login-machine';
import { Button } from '@/shared/ui/button';
import { AppleIcon } from '@/shared/ui/icon/AppleIcon';
import { KakaoIcon } from '@/shared/ui/icon/KakaoIcon';

import { OnboardingCarousel, type IOnboardingCarouselHandle } from './OnboardingCarousel';

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
  const carouselRef = useRef<IOnboardingCarouselHandle>(null);

  const { state, send } = useLoginMachine();

  const isBridgeAvailable = typeof window !== 'undefined' && isWebViewBridgeAvailable();
  const canUseNativeKakaoLogin = isBridgeAvailable && isNativeMethodAvailable('signInWithKakao');
  const canUseNativeAppleLogin = isBridgeAvailable && isNativeMethodAvailable('signInWithApple');

  const isPending = state.tag === 'authenticating' || state.tag === 'retrying';

  useEffect(() => {
    if (state.tag === 'failed') {
      toast.error(LOGIN_FAILURE_MESSAGES[state.reason]);
    }
  }, [state]);

  const labelFor = (provider: LoginProvider, defaultLabel: string): string => {
    if (state.tag === 'authenticating' && state.provider === provider) {
      return state.attempt > 0 ? `재시도 중... (${state.attempt}/2)` : '로그인 중...';
    }
    if (state.tag === 'retrying' && state.provider === provider) {
      return `재시도 대기 중... (${state.attempt}/2)`;
    }
    return defaultLabel;
  };

  const handleNext = () => {
    if (carouselRef.current?.canScrollNext()) {
      carouselRef.current.scrollNext();
    } else {
      setStep('login');
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {step === 'onboarding' && (
        <div className="flex min-h-dvh flex-col">
          <OnboardingCarousel ref={carouselRef} items={ONBOARDING_TEXT}>
            <div className="flex h-full items-center justify-center">
              <Image
                preload
                src="/images/WebOnboardingImage1.png"
                alt="온보딩 이미지 1"
                width={148}
                height={283}
              />
            </div>
            <div className="flex h-full items-center justify-center">
              <Image
                preload
                src="/images/WebOnboardingImage2.png"
                alt="온보딩 이미지 2"
                width={148}
                height={283}
              />
            </div>
            <div className="flex h-full items-center justify-center">
              <Image
                preload
                src="/images/WebOnboardingImage3.png"
                alt="온보딩 이미지 3"
                width={148}
                height={283}
              />
            </div>
          </OnboardingCarousel>
          <div className="flex flex-col items-center gap-2 px-5 pb-8">
            <Button className="w-full bg-primary-40" onClick={handleNext}>
              다음
            </Button>
            <p className="text-center caption-12-regular text-neutral-50">
              이미 가입했나요?{' '}
              <button
                onClick={() => setStep('login')}
                className="caption-12-semibold underline underline-offset-2"
              >
                로그인
              </button>
            </p>
          </div>
        </div>
      )}

      {step === 'login' && (
        <div className="flex min-h-dvh flex-col items-center">
          <div className="flex flex-1 items-center justify-center">
            <Image src="/images/LoginPageImage.png" alt="archiview 로고" width={246} height={45} />
          </div>
          <div className="flex w-full flex-col gap-4 px-5 pb-10">
            <Button
              variant="login"
              startIcon={<KakaoIcon />}
              className="bg-[#FEE500] w-full"
              type="button"
              onClick={() =>
                send({
                  type: 'START',
                  provider: 'KAKAO',
                  platform: canUseNativeKakaoLogin ? 'NATIVE' : 'WEB',
                })
              }
              disabled={isPending}
            >
              <span className="text-neutral-70">{labelFor('KAKAO', '카카오톡으로 로그인')}</span>
            </Button>
            <Button
              variant="login"
              startIcon={<AppleIcon />}
              className="bg-[#000000] w-full"
              type="button"
              onClick={() =>
                send({
                  type: 'START',
                  provider: 'APPLE',
                  platform: canUseNativeAppleLogin ? 'NATIVE' : 'WEB',
                })
              }
              disabled={isPending}
            >
              <span className="text-neutral-10">{labelFor('APPLE', 'Apple로 로그인')}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
