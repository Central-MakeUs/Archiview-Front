'use client';

import { useEffect, useRef, useState } from 'react';

const KAKAO_SDK_SCRIPT_ID = 'kakao-map-sdk';
const KAKAO_SDK_BASE_URL = 'https://dapi.kakao.com/v2/maps/sdk.js';
const KAKAO_SDK_TIMEOUT_MS = 10000;

let kakaoSdkPromise: Promise<typeof window.kakao> | undefined;

interface IKakaoMapProps {
  lat: number;
  lng: number;
  level?: number;
  marker?: {
    lat: number;
    lng: number;
  };
  markers?: Array<{
    id?: number;
    lat: number;
    lng: number;
    zIndex?: number;
    imageSrc?: string;
    imageSize?: {
      width: number;
      height: number;
    };
    imageOffset?: {
      x: number;
      y: number;
    };
  }>;
  onMarkerClick?: (marker: { id?: number; lat: number; lng: number }) => void;
  onMapClick?: () => void;
  onReady?: (ctx: { kakao: typeof window.kakao; map: kakao.maps.Map }) => void;
  className?: string;
}

function createKakaoSdkUrl(): string {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  if (!appKey) {
    throw new Error('NEXT_PUBLIC_KAKAO_MAP_KEY is missing');
  }

  const searchParams = new URLSearchParams({
    appkey: appKey,
    libraries: 'services',
    autoload: 'false',
  });

  return `${KAKAO_SDK_BASE_URL}?${searchParams.toString()}`;
}

function loadKakaoSdk(): Promise<typeof window.kakao> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Kakao Maps SDK can only be loaded in browser'));
  }

  if (window.kakao?.maps) {
    return Promise.resolve(window.kakao);
  }

  if (kakaoSdkPromise) {
    return kakaoSdkPromise;
  }

  kakaoSdkPromise = new Promise((resolve, reject) => {
    let settled = false;
    let timeoutId = 0;

    const complete = (callback: () => void): void => {
      if (settled) {
        return;
      }

      settled = true;
      window.clearTimeout(timeoutId);
      callback();
    };

    const fail = (error: Error): void => {
      complete(() => {
        kakaoSdkPromise = undefined;
        reject(error);
      });
    };

    timeoutId = window.setTimeout(() => {
      fail(new Error('Timed out while loading Kakao Maps SDK'));
    }, KAKAO_SDK_TIMEOUT_MS);

    const resolveWithKakao = (): void => {
      if (!window.kakao?.maps) {
        fail(new Error('Kakao Maps SDK is not available after loading script'));
        return;
      }

      window.kakao.maps.load(() => {
        if (!window.kakao?.maps) {
          fail(new Error('Kakao Maps SDK failed to initialize'));
          return;
        }

        complete(() => {
          resolve(window.kakao);
        });
      });
    };

    const existingScript = document.getElementById(KAKAO_SDK_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.kakao?.maps) {
        resolveWithKakao();
        return;
      }

      existingScript.addEventListener('load', resolveWithKakao, { once: true });
      existingScript.addEventListener(
        'error',
        () => fail(new Error('Failed to load Kakao Maps SDK script')),
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.id = KAKAO_SDK_SCRIPT_ID;
    script.src = createKakaoSdkUrl();
    script.async = true;
    script.defer = true;

    script.addEventListener('load', resolveWithKakao, { once: true });
    script.addEventListener(
      'error',
      () => fail(new Error('Failed to load Kakao Maps SDK script')),
      {
        once: true,
      },
    );

    document.head.appendChild(script);
  });

  return kakaoSdkPromise;
}

export const KakaoMap = ({
  lat,
  lng,
  level = 3,
  marker,
  markers,
  onMarkerClick,
  onMapClick,
  onReady,
  className,
}: IKakaoMapProps) => {
  const elRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const kakaoRef = useRef<typeof window.kakao | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const relayoutRafRef = useRef<number | null>(null);

  const onReadyRef = useRef<IKakaoMapProps['onReady']>(onReady);
  const onMarkerClickRef = useRef<IKakaoMapProps['onMarkerClick']>(onMarkerClick);
  const onMapClickRef = useRef<IKakaoMapProps['onMapClick']>(onMapClick);
  const latestRef = useRef({ lat, lng, level });
  const markerClickingRef = useRef(false);

  const [isMapReady, setIsMapReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  useEffect(() => {
    onMapClickRef.current = onMapClick;
  }, [onMapClick]);

  useEffect(() => {
    latestRef.current = { lat, lng, level };
  }, [lat, lng, level]);

  // 초기화
  useEffect(() => {
    let cancelled = false;
    const relayoutTimeoutIds: Array<ReturnType<typeof setTimeout>> = [];

    const initMap = async () => {
      const kakao = await loadKakaoSdk();
      if (cancelled || !elRef.current) return;

      kakaoRef.current = kakao;

      const { lat, lng, level } = latestRef.current;
      const center = new kakao.maps.LatLng(lat, lng);

      const map = new kakao.maps.Map(elRef.current, { center, level });
      mapRef.current = map;
      setIsMapReady(true);

      const relayoutAndCenter = () => {
        const currentMap = mapRef.current;
        const currentKakao = kakaoRef.current;
        if (!currentMap || !currentKakao) return;

        const { lat, lng } = latestRef.current;
        currentMap.relayout();
        currentMap.setCenter(new currentKakao.maps.LatLng(lat, lng));
      };

      [0, 180, 420].forEach((delayMs) => {
        const timeoutId = setTimeout(() => {
          if (cancelled) return;
          relayoutAndCenter();
        }, delayMs);

        relayoutTimeoutIds.push(timeoutId);
      });

      kakao.maps.event.addListener(map, 'click', () => {
        if (markerClickingRef.current) {
          markerClickingRef.current = false;
          return;
        }
        onMapClickRef.current?.();
      });

      onReadyRef.current?.({ kakao, map });
    };

    initMap().catch((e) => {
      if (!cancelled) setError(e instanceof Error ? e.message : 'Unknown error');
    });

    return () => {
      cancelled = true;
      relayoutTimeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      if (relayoutRafRef.current !== null) {
        window.cancelAnimationFrame(relayoutRafRef.current);
        relayoutRafRef.current = null;
      }
      markersRef.current.forEach((item) => item.setMap(null));
      markersRef.current = [];
      mapRef.current = null;
      kakaoRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const kakao = kakaoRef.current;
    const element = elRef.current;
    if (!isMapReady || !map || !kakao || !element) return;
    if (typeof ResizeObserver === 'undefined') return;

    const relayoutAndCenter = () => {
      const currentMap = mapRef.current;
      const currentKakao = kakaoRef.current;
      if (!currentMap || !currentKakao) return;

      const { lat, lng } = latestRef.current;
      currentMap.relayout();
      currentMap.setCenter(new currentKakao.maps.LatLng(lat, lng));
    };

    const observer = new ResizeObserver(() => {
      if (relayoutRafRef.current !== null) {
        window.cancelAnimationFrame(relayoutRafRef.current);
      }

      relayoutRafRef.current = window.requestAnimationFrame(() => {
        relayoutAndCenter();
        relayoutRafRef.current = null;
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (relayoutRafRef.current !== null) {
        window.cancelAnimationFrame(relayoutRafRef.current);
        relayoutRafRef.current = null;
      }
    };
  }, [isMapReady]);

  // 업데이트
  useEffect(() => {
    const kakao = kakaoRef.current;
    const map = mapRef.current;
    if (!isMapReady || !kakao || !map) return;

    const center = new kakao.maps.LatLng(lat, lng);
    map.setCenter(center);
    map.setLevel(level);
  }, [lat, lng, level, isMapReady]);

  useEffect(() => {
    const kakao = kakaoRef.current;
    const map = mapRef.current;
    if (!isMapReady || !kakao || !map) return;

    markersRef.current.forEach((item) => item.setMap(null));
    markersRef.current = [];

    if (Array.isArray(markers) && markers.length > 0) {
      markersRef.current = markers.map((item) => {
        const position = new kakao.maps.LatLng(item.lat, item.lng);

        if (item.imageSrc) {
          const markerImage = new kakao.maps.MarkerImage(
            item.imageSrc,
            new kakao.maps.Size(item.imageSize?.width ?? 40, item.imageSize?.height ?? 40),
            item.imageOffset
              ? {
                  offset: new kakao.maps.Point(item.imageOffset.x, item.imageOffset.y),
                }
              : undefined,
          );

          const mapMarker = new kakao.maps.Marker({
            position,
            map,
            image: markerImage,
          });

          if (typeof item.zIndex === 'number') {
            mapMarker.setZIndex(item.zIndex);
          }

          kakao.maps.event.addListener(mapMarker, 'click', () => {
            markerClickingRef.current = true;
            setTimeout(() => {
              markerClickingRef.current = false;
            }, 0);
            onMarkerClickRef.current?.({
              id: item.id,
              lat: item.lat,
              lng: item.lng,
            });
          });

          return mapMarker;
        }

        const mapMarker = new kakao.maps.Marker({
          position,
          map,
        });

        if (typeof item.zIndex === 'number') {
          mapMarker.setZIndex(item.zIndex);
        }

        kakao.maps.event.addListener(mapMarker, 'click', () => {
          markerClickingRef.current = true;
          setTimeout(() => {
            markerClickingRef.current = false;
          }, 0);
          onMarkerClickRef.current?.({
            id: item.id,
            lat: item.lat,
            lng: item.lng,
          });
        });

        return mapMarker;
      });
      return;
    }

    if (!marker) return;

    const position = new kakao.maps.LatLng(marker.lat, marker.lng);

    markersRef.current = [
      new kakao.maps.Marker({
        position,
        map,
      }),
    ];
  }, [marker, markers, isMapReady]);

  if (error) return <div>지도 로드 실패: {error}</div>;

  return <div ref={elRef} className={`w-full h-full ${className ?? ''}`} />;
};
