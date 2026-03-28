'use client';

import { useTranslations } from 'next-intl';
import { FolderIcon } from '@/shared/ui/icon/place-info/FolderIcon';
import { MedalIcon } from '@/shared/ui/icon/place-info/MedalIcon';
import PhoneIcon from '@/shared/ui/icon/place-info/PhoneIcon';
import { PinIcon } from '@/shared/ui/icon/place-info/PinIcon';
import {
  createKakaoMapRouteFromToUrl,
  createKakaoMapSearchUrl,
  createKakaoMapToUrl,
  normalizeKakaoMapSearchQuery,
} from '@/shared/constants/url';
import { Button } from '@/shared/ui/button';

import {
  isAppWebView,
  openExternalLinkInWebViewOrBrowser,
  requestNativeCurrentLocation,
  tryOpenExternalUrlViaNative,
} from '@/shared/lib/native-actions';

const createKakaoMapAppSearchUrl = (query: string) => {
  return `kakaomap://search?q=${encodeURIComponent(normalizeKakaoMapSearchQuery(query))}`;
};

const createKakaoMapAppLookUrl = (latitude: number, longitude: number) => {
  return `kakaomap://look?p=${latitude},${longitude}`;
};

const createKakaoMapAppRouteUrl = (params: {
  toLatitude: number;
  toLongitude: number;
  fromLatitude?: number;
  fromLongitude?: number;
}) => {
  const { toLatitude, toLongitude, fromLatitude, fromLongitude } = params;

  if (Number.isFinite(fromLatitude) && Number.isFinite(fromLongitude)) {
    return `kakaomap://route?sp=${fromLatitude},${fromLongitude}&ep=${toLatitude},${toLongitude}&by=FOOT`;
  }

  return `kakaomap://route?ep=${toLatitude},${toLongitude}&by=FOOT`;
};

interface IPlaceDetail {
  placeId: number;
  name: string;
  placeUrl: string;
  phoneNumber: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
  nearestStationWalkTime: string;
  viewCount: number;
  saveCount: number;
  instagramInflowCount: number;
  directionCount: number;
}

export const InfoSection = ({
  place,
  recordNumber,
}: {
  place?: IPlaceDetail;
  recordNumber?: number;
}) => {
  const t = useTranslations('archiverPlaceInfo');
  const handleClickOpenKakaoMap = async () => {
    const address = (place?.roadAddressName || place?.addressName)?.trim();
    if (!address) return;

    const latitude = place?.latitude;
    const longitude = place?.longitude;

    const webUrl = createKakaoMapSearchUrl(address);
    const appUrl =
      typeof latitude === 'number' && typeof longitude === 'number'
        ? createKakaoMapAppLookUrl(latitude, longitude)
        : createKakaoMapAppSearchUrl(address);

    if (isAppWebView()) {
      const openedByApp = await tryOpenExternalUrlViaNative(appUrl);
      if (!openedByApp) {
        openExternalLinkInWebViewOrBrowser(webUrl);
      }
      return;
    }

    openExternalLinkInWebViewOrBrowser(webUrl);
  };

  const handleClickOpenKakaoMapDirections = async () => {
    const rawToName = (place?.roadAddressName || place?.addressName)?.trim();
    const toName = rawToName ? normalizeKakaoMapSearchQuery(rawToName) : '';
    const toLatitude = place?.latitude;
    const toLongitude = place?.longitude;

    if (!toName) return;
    if (typeof toLatitude !== 'number' || typeof toLongitude !== 'number') return;
    if (!Number.isFinite(toLatitude) || !Number.isFinite(toLongitude)) return;

    if (isAppWebView()) {
      const currentLocation = await requestNativeCurrentLocation();

      const fromLatitude = currentLocation?.coords.latitude;
      const fromLongitude = currentLocation?.coords.longitude;

      const appUrl = createKakaoMapAppRouteUrl({
        toLatitude,
        toLongitude,
        fromLatitude,
        fromLongitude,
      });

      const hasFromCoords =
        typeof fromLatitude === 'number' &&
        typeof fromLongitude === 'number' &&
        Number.isFinite(fromLatitude) &&
        Number.isFinite(fromLongitude);

      const webUrl = hasFromCoords
        ? createKakaoMapRouteFromToUrl({
            fromName: t('currentLocationLabel'),
            fromLatitude,
            fromLongitude,
            toName,
            toLatitude,
            toLongitude,
          })
        : createKakaoMapToUrl(toName, toLatitude, toLongitude);

      const openedByApp = await tryOpenExternalUrlViaNative(appUrl);
      if (!openedByApp) {
        openExternalLinkInWebViewOrBrowser(webUrl);
      }
      return;
    }

    const destinationOnlyUrl = createKakaoMapToUrl(toName, toLatitude, toLongitude);

    const tab = window.open('about:blank', '_blank');
    if (tab) {
      tab.opener = null;

      tab.document.title = t('kakaoMapTabTitle');
      tab.document.body.style.margin = '0';
      tab.document.body.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
      tab.document.body.style.background = '#ffffff';
      tab.document.body.innerHTML = `
          <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;">
            <div style="width:100%;max-width:420px;border:1px solid #e5e7eb;border-radius:16px;padding:18px 16px;box-sizing:border-box;">
              <div style="display:flex;gap:12px;align-items:flex-start;">
                <div style="width:36px;height:36px;border-radius:9999px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;flex:0 0 auto;">
                  <div style="width:18px;height:18px;border-radius:9999px;border:2px solid #d1d5db;border-top-color:#111827;animation:archiview-spin 0.9s linear infinite;"></div>
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:14px;font-weight:700;color:#111827;">${t('directionsLoadingTitle')}<span class=\"archiview-dots\" aria-hidden=\"true\"><span>.</span><span>.</span><span>.</span></span></div>
                  <div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.5;">${t('directionsLoadingBody1')}</div>
                  <div style="margin-top:10px;font-size:12px;color:#9ca3af;line-height:1.5;">${t('directionsLoadingBody2')}</div>
                </div>
              </div>
            </div>
          </div>
          <style>
            @keyframes archiview-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .archiview-dots { display:inline-flex; gap:1px; margin-left:2px; }
            .archiview-dots span { opacity: 0.25; animation: archiview-dot 1.1s infinite; }
            .archiview-dots span:nth-child(2) { animation-delay: 0.15s; }
            .archiview-dots span:nth-child(3) { animation-delay: 0.3s; }
            @keyframes archiview-dot { 0%, 80%, 100% { opacity: 0.25; } 40% { opacity: 1; } }
          </style>
        `;
    }

    const navigate = (url: string) => {
      if (tab) {
        tab.location.href = url;
        return;
      }
      window.location.href = url;
    };

    const geo = tab?.navigator?.geolocation ?? navigator.geolocation;
    if (!geo) {
      navigate(destinationOnlyUrl);
      return;
    }

    geo.getCurrentPosition(
      ({ coords }) => {
        const routeUrl = createKakaoMapRouteFromToUrl({
          fromName: t('currentLocationLabel'),
          fromLatitude: coords.latitude,
          fromLongitude: coords.longitude,
          toName,
          toLatitude,
          toLongitude,
        });
        navigate(routeUrl);
      },
      () => {
        navigate(destinationOnlyUrl);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return (
    <div>
      <section className="p-5 gap-3 flex flex-col border-b-[#DBDCDF] border-b">
        <div className="body-16-semibold text-neutral-50">{t('placeInfoSectionTitle')}</div>
        <div className="body-14-semibold text-neutral-50 flex flex-col gap-2">
          <div className="flex gap-2.5 items-center">
            <MedalIcon />
            <div>
              {t.rich('editorsRecorded', {
                count: recordNumber ?? 0,
                highlight: (chunks) => <span className="text-primary-40 underline">{chunks}</span>,
              })}
            </div>
          </div>
          <div className="flex gap-2.5 items-center">
            <FolderIcon className="text-primary-40 h-5.5 w-5.5" />
            <div>
              {t.rich('archiversSaved', {
                count: place?.saveCount ?? 0,
                highlight: (chunks) => <span className="text-primary-40 underline">{chunks}</span>,
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2.5 items-center">
              <PinIcon className="text-primary-40 h-5.5 w-5.5" />
              {place?.addressName}
            </div>
            {/* TODO : 네이티브일 때 지도 연결 */}
            <button
              type="button"
              className="text-primary-40 underline cursor-pointer bg-transparent border-0 p-0"
              onClick={() => {
                handleClickOpenKakaoMap().catch(() => undefined);
              }}
            >
              {t('mapView')}
            </button>
          </div>
          <div className="flex gap-2.5 items-center">
            <PhoneIcon className="text-primary-40 h-5.5 w-5.5" />
            {place?.phoneNumber}
          </div>
        </div>
      </section>

      <div className="pt-6 px-5">
        <Button
          className="w-full"
          onClick={() => {
            handleClickOpenKakaoMapDirections().catch(() => undefined);
          }}
        >
          {t('directionsButton')}
        </Button>
      </div>
    </div>
  );
};
