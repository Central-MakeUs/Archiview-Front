import { Button } from '@/shared/ui/button';
import { KakaoIcon } from '@/shared/ui/icon/KakaoIcon';
import { AppleIcon } from '@/shared/ui/icon/AppleIcon';
import { GoogleIcon } from '@/shared/ui/icon/GoogleIcon';

const isReactNativeWebView = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    typeof (window as { ReactNativeWebView?: { postMessage?: unknown } }).ReactNativeWebView
      ?.postMessage === 'function'
  );
};

const postMessageToReactNativeWebView = (message: unknown): void => {
  if (typeof window === 'undefined') return;
  const rn = (window as { ReactNativeWebView?: { postMessage?: (data: string) => void } })
    .ReactNativeWebView;
  if (!rn?.postMessage) return;
  rn.postMessage(JSON.stringify(message));
};

const joinUrl = (base: string, path: string): string => {
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

export const KakaoButton = () => {
  const handleClick = () => {
    if (isReactNativeWebView()) {
      postMessageToReactNativeWebView({ type: 'AUTH_LOGIN', provider: ' ' });
      return;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const target = apiBaseUrl
      ? joinUrl(apiBaseUrl, '/oauth2/authorization/kakao')
      : '/oauth2/authorization/kakao';

    window.location.href = target;
  };

  return (
    <Button
      variant="login"
      startIcon={<KakaoIcon />}
      className="bg-[#FEE500] w-full"
      type="button"
      onClick={handleClick}
    >
      <span className="text-neutral-70">카카오톡으로 로그인</span>
    </Button>
  );
};

export const AppleButton = () => {
  return (
    <Button variant="login" startIcon={<AppleIcon />} className="bg-[#000000] w-full" type="button">
      <span className="text-neutral-10">Apple 로 로그인</span>
    </Button>
  );
};

export const GoogleButton = () => {
  return (
    <Button variant="login" startIcon={<GoogleIcon />} className="bg-[#F5F6FA] w-full" type="button">
      <span className="text-neutral-70">구글로 로그인</span>
    </Button>
  );
};
