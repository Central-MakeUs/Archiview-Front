import Script from 'next/script';
import type { Metadata } from 'next';

import '@/shared/styles/globals.css';

import { MSWProvider } from '../providers/MSWProvider';

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

if (!KAKAO_KEY) {
  throw new Error('NEXT_PUBLIC_KAKAO_MAP_KEY is missing');
}

const KAKAO_SDK_URL =
  `//dapi.kakao.com/v2/maps/sdk.js` +
  `?appkey=${KAKAO_KEY}` +
  `&libraries=services` +
  `&autoload=false`;

export const metadata: Metadata = {
  title: 'Archiview',
  authors: [
    {
      name: 'Zero Friction Team',
    },
  ],
  description: '너,나 우리의 정보 공유 플랫폼',
};

export function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <html lang="en">
      <body className="bg-neutral-20">
        <Script id="kakao-map-sdk" src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
