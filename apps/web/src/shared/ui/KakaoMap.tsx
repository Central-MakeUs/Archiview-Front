'use client';

import { useEffect, useRef, useState } from 'react';

interface IKakaoMapProps {
  lat: number;
  lng: number;
  level?: number;
  marker?: {
    lat: number;
    lng: number;
  };
  onReady?: (ctx: { kakao: typeof window.kakao; map: kakao.maps.Map }) => void;
  className?: string;
}

function waitForKakao(maxWaitMs = 5000): Promise<typeof window.kakao> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const tick = () => {
      if (typeof window !== 'undefined' && window.kakao?.maps) return resolve(window.kakao);
      if (Date.now() - start > maxWaitMs) return reject(new Error('Kakao Maps SDK not loaded'));
      setTimeout(tick, 50);
    };

    tick();
  });
}

export const KakaoMap = ({ lat, lng, level = 3, marker, onReady, className }: IKakaoMapProps) => {
  const elRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const kakaoRef = useRef<typeof window.kakao | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);

  const onReadyRef = useRef<IKakaoMapProps['onReady']>(onReady);
  const latestRef = useRef({ lat, lng, level });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    latestRef.current = { lat, lng, level };
  }, [lat, lng, level]);

  // 초기화
  useEffect(() => {
    let cancelled = false;

    const initMap = async () => {
      const kakao = await waitForKakao();
      if (cancelled) return;

      kakao.maps.load(() => {
        if (cancelled || !elRef.current) return;

        kakaoRef.current = kakao;

        const { lat, lng, level } = latestRef.current;
        const center = new kakao.maps.LatLng(lat, lng);

        const map = new kakao.maps.Map(elRef.current, { center, level });
        mapRef.current = map;

        if (marker) {
          const markerPosition = new kakao.maps.LatLng(marker.lat, marker.lng);
          markerRef.current = new kakao.maps.Marker({
            position: markerPosition,
            map,
          });
        }

        onReadyRef.current?.({ kakao, map });
      });
    };

    initMap().catch((e) => {
      if (!cancelled) setError(e instanceof Error ? e.message : 'Unknown error');
    });

    return () => {
      cancelled = true;
      markerRef.current?.setMap(null);
      markerRef.current = null;
      mapRef.current = null;
      kakaoRef.current = null;
    };
  }, []);

  // 업데이트
  useEffect(() => {
    const kakao = kakaoRef.current;
    const map = mapRef.current;
    if (!kakao || !map) return;

    const center = new kakao.maps.LatLng(lat, lng);
    map.setCenter(center);
    map.setLevel(level);
  }, [lat, lng, level]);

  useEffect(() => {
    const kakao = kakaoRef.current;
    const map = mapRef.current;
    if (!kakao || !map) return;

    if (!marker) {
      markerRef.current?.setMap(null);
      markerRef.current = null;
      return;
    }

    const position = new kakao.maps.LatLng(marker.lat, marker.lng);

    if (!markerRef.current) {
      markerRef.current = new kakao.maps.Marker({
        position,
        map,
      });
      return;
    }

    markerRef.current.setPosition(position);
    markerRef.current.setMap(map);
  }, [marker]);

  if (error) return <div>지도 로드 실패: {error}</div>;

  return <div ref={elRef} className={`w-full h-full ${className ?? ''}`} />;
};
