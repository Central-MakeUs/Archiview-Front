'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { useAppleMobileLogin } from '@/entities/auth/mutations/useAppleMobileLogin';
import { useKakaoMobileLogin } from '@/entities/auth/mutations/useKakaoMobileLogin';
import type {
  IAppleMobileLoginResponseDTO,
  IKakaoMobileLoginResponseDTO,
} from '@/entities/auth/model/auth.type';
import Cookies from 'js-cookie';

import { COOKIE_KEYS, getDefaultCookieOptions } from '@/shared/constants/cookies';
import {
  isNativeMethodAvailable,
  isWebViewBridgeAvailable,
  signInWithApple,
  signInWithKakao,
} from '@/shared/lib/native-bridge';
import { Button } from '@/shared/ui/button';
import { AppleIcon } from '@/shared/ui/icon/AppleIcon';
import { KakaoIcon } from '@/shared/ui/icon/KakaoIcon';

import { OnboardingCarousel, type IOnboardingCarouselHandle } from './OnboardingCarousel';
import { KakaoButton } from './SocialLoginButton';
import { AppleLoginButton } from './AppleLoginButton';

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
  const [isNativeKakaoSigningIn, setIsNativeKakaoSigningIn] = useState(false);
  const [isNativeAppleSigningIn, setIsNativeAppleSigningIn] = useState(false);
  const carouselRef = useRef<IOnboardingCarouselHandle>(null);

  const { mutateAsync: mobileAppleLogin, isPending: isMobileAppleLoginPending } =
    useAppleMobileLogin();
  const { mutateAsync: mobileKakaoLogin, isPending: isMobileKakaoLoginPending } =
    useKakaoMobileLogin();

  const isBridgeAvailable = typeof window !== 'undefined' && isWebViewBridgeAvailable();

  const canUseNativeKakaoLogin = isBridgeAvailable && isNativeMethodAvailable('signInWithKakao');

  const canUseNativeAppleLogin = isBridgeAvailable && isNativeMethodAvailable('signInWithApple');

  const isNativeKakaoLoginPending = isNativeKakaoSigningIn || isMobileKakaoLoginPending;

  const isNativeAppleLoginPending = isNativeAppleSigningIn || isMobileAppleLoginPending;

  const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
  };

  const extractAccessToken = (
    response: IAppleMobileLoginResponseDTO | IKakaoMobileLoginResponseDTO,
  ): string | null => {
    if (!response.success) {
      return null;
    }

    if (!isRecord(response.data)) {
      return null;
    }

    const accessToken = response.data.accessToken;
    return typeof accessToken === 'string' && accessToken.length > 0 ? accessToken : null;
  };

  const persistAccessToken = (accessToken: string) => {
    Cookies.set(COOKIE_KEYS.accessToken, accessToken, getDefaultCookieOptions());
    window.location.href = '/';
  };

  const handleNativeKakaoLogin = async () => {
    if (isNativeKakaoLoginPending) return;

    setIsNativeKakaoSigningIn(true);

    try {
      const nativeResult = await signInWithKakao();

      if (!nativeResult || nativeResult.status === 'cancelled') {
        return;
      }

      if (nativeResult.status === 'error') {
        console.error('Native Kakao login failed', nativeResult.reason, nativeResult.message);
        return;
      }

      const kakaoAccessToken = nativeResult.credential.accessToken;

      if (!kakaoAccessToken) {
        console.error('Native Kakao login credential is missing accessToken');
        return;
      }

      const response = await mobileKakaoLogin({ accessToken: kakaoAccessToken });
      const accessToken = extractAccessToken(response);

      if (!accessToken) {
        console.error('Mobile Kakao login response does not include accessToken');
        return;
      }

      persistAccessToken(accessToken);
    } catch (error) {
      console.error('Failed to login with native Kakao login', error);
    } finally {
      setIsNativeKakaoSigningIn(false);
    }
  };

  const handleNativeAppleLogin = async () => {
    if (isNativeAppleLoginPending) return;

    setIsNativeAppleSigningIn(true);

    try {
      const nativeResult = await signInWithApple();

      if (!nativeResult || nativeResult.status === 'cancelled') {
        return;
      }

      if (nativeResult.status === 'error') {
        console.error('Native Apple login failed', nativeResult.reason, nativeResult.message);
        return;
      }

      const idToken = nativeResult.credential.idToken;
      const authorizationCode = nativeResult.credential.authorizationCode;

      if (!idToken || !authorizationCode) {
        console.error('Native Apple login credential is missing required tokens');
        return;
      }

      const response = await mobileAppleLogin({ idToken, authorizationCode });

      const accessToken = extractAccessToken(response);

      if (!accessToken) {
        console.error('Mobile Apple login response does not include accessToken');
        return;
      }

      persistAccessToken(accessToken);
    } catch (error) {
      console.error('Failed to login with native Apple login', error);
    } finally {
      setIsNativeAppleSigningIn(false);
    }
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
            {/* 나중에 슬라이드 바꾸기 */}
            <div className="flex h-full items-center justify-center">
              <Image
                src="/images/WebOnboardingImage1.png"
                alt="온보딩 이미지 1"
                width={148}
                height={283}
              />
            </div>

            <div className="flex h-full items-center justify-center">
              <Image
                src="/images/WebOnboardingImage2.png"
                alt="온보딩 이미지 2"
                width={148}
                height={283}
              />
            </div>

            <div className="flex h-full items-center justify-center">
              <Image
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
            {canUseNativeKakaoLogin ? (
              <Button
                variant="login"
                startIcon={<KakaoIcon />}
                className="bg-[#FEE500] w-full"
                type="button"
                onClick={handleNativeKakaoLogin}
                disabled={isNativeKakaoLoginPending}
              >
                <span className="text-neutral-70">카카오톡으로 로그인</span>
              </Button>
            ) : (
              <KakaoButton />
            )}
            {canUseNativeAppleLogin ? (
              <Button
                variant="login"
                startIcon={<AppleIcon />}
                className="bg-[#000000] w-full"
                type="button"
                onClick={handleNativeAppleLogin}
                disabled={isNativeAppleLoginPending}
              >
                <span className="text-neutral-10">Apple로 로그인</span>
              </Button>
            ) : (
              <AppleLoginButton
                clientId={process.env.NEXT_PUBLIC_APPLE_CLIENT_ID!}
                redirectUri={process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI!}
                redirectUriDev={process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI_DEV}
                className="w-full rounded-xl bg-black px-4 py-3 text-white flex items-center justify-center"
              >
                Apple로 로그인
              </AppleLoginButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
