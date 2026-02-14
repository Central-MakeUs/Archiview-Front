import { Button } from '@/shared/ui/button';
import { KakaoIcon } from '@/shared/ui/icon/KakaoIcon';

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

const withDevQuery = (target: string): string => {
  const url = new URL(target, window.location.origin);

  if (process.env.NODE_ENV === 'development') {
    url.searchParams.set('dev', 'true');
  }

  const isRelative = !/^(https?:)?\/\//.test(target);
  return isRelative ? `${url.pathname}${url.search}${url.hash}` : url.toString();
};

export const KakaoButton = () => {
  const handleClick = () => {
    if (isReactNativeWebView()) {
      postMessageToReactNativeWebView({ type: 'AUTH_LOGIN', provider: 'kakao' });
      return;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const rawTarget = apiBaseUrl
      ? joinUrl(apiBaseUrl, '/oauth2/authorization/kakao')
      : '/oauth2/authorization/kakao';

    const target = withDevQuery(rawTarget);

    window.location.href = target;
  };

  return (
    <Button
      startIcon={<KakaoIcon />}
      className="bg-[#FEE500] w-full"
      type="button"
      onClick={handleClick}
    >
      <span className="text-neutral-70">카카오톡으로 로그인</span>
    </Button>
  );
};
