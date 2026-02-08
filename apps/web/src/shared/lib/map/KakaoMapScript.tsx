'use client';

import Script from 'next/script';

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

if (!KAKAO_KEY) {
  throw new Error('NEXT_PUBLIC_KAKAO_MAP_KEY is missing');
}

const KAKAO_SDK_URL =
  `//dapi.kakao.com/v2/maps/sdk.js` +
  `?appkey=${KAKAO_KEY}` +
  `&libraries=services` +
  `&autoload=false`;

export function KakaoMapScript() {
  return <Script id="kakao-map-sdk" src={KAKAO_SDK_URL} strategy="beforeInteractive" />;
}
