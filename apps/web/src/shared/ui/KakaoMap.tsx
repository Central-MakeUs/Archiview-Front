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

function waitForKakao(maxWaitMs: number = 5000): Promise<typeof window.kakao> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const tick = (): void => {
      if (typeof window !== 'undefined' && window.kakao?.maps) return resolve(window.kakao);
      if (Date.now() - start > maxWaitMs) return reject(new Error('Kakao Maps SDK not loaded'));
      setTimeout(tick, 50);
    };

    tick();
  });
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
        setIsMapReady(true);

        kakao.maps.event.addListener(map, 'click', () => {
          if (markerClickingRef.current) {
            markerClickingRef.current = false;
            return;
          }
          onMapClickRef.current?.();
        });

        onReadyRef.current?.({ kakao, map });
      });
    };

    initMap().catch((e) => {
      if (!cancelled) setError(e instanceof Error ? e.message : 'Unknown error');
    });

    return () => {
      cancelled = true;
      markersRef.current.forEach((item) => item.setMap(null));
      markersRef.current = [];
      mapRef.current = null;
      kakaoRef.current = null;
    };
  }, []);

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
