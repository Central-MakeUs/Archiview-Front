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
  isWebViewBridgeAvailable,
  openExternalUrl,
  openInAppBrowser,
} from '@/shared/lib/native-bridge';

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
  console.log(place);
  const handleClickOpenKakaoMap = () => {
    const address = (place?.roadAddressName || place?.addressName)?.trim();
    if (!address) return;

    const url = createKakaoMapSearchUrl(address);

    if (isWebViewBridgeAvailable()) {
      openExternalUrl(url)
        .then((opened) => {
          if (opened) return;
          return openInAppBrowser(url);
        })
        .catch(() => {
          return openInAppBrowser(url);
        })
        .catch(() => {
          return;
        });
      return;
    }

    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.opener = null;
      return;
    }
    window.location.href = url;
  };

  const handleClickOpenKakaoMapDirections = () => {
    const rawToName = (place?.roadAddressName || place?.addressName)?.trim();
    const toName = rawToName ? normalizeKakaoMapSearchQuery(rawToName) : '';
    const toLatitude = place?.latitude;
    const toLongitude = place?.longitude;

    if (!toName) return;
    if (typeof toLatitude !== 'number' || typeof toLongitude !== 'number') return;
    if (!Number.isFinite(toLatitude) || !Number.isFinite(toLongitude)) return;

    if (isWebViewBridgeAvailable()) {
      // TODO: WebView/RN 환경에서는 브릿지로 현재 위치를 가져와서
      // `openExternalUrl`/`openInAppBrowser`로 길찾기 URL을 열어야 함.
      // (참고: web 브라우저는 `navigator.geolocation`을 사용)
      return;
    }

    const destinationOnlyUrl = createKakaoMapToUrl(toName, toLatitude, toLongitude);

    const tab = window.open('about:blank', '_blank');
    if (tab) {
      tab.opener = null;

      tab.document.title = 'KakaoMap';
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
                  <div style="font-size:14px;font-weight:700;color:#111827;">길찾기를 여는 중<span class=\"archiview-dots\" aria-hidden=\"true\"><span>.</span><span>.</span><span>.</span></span></div>
                  <div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.5;">현재 위치 권한을 요청할 수 있어요. 잠시만 기다려 주세요.</div>
                  <div style="margin-top:10px;font-size:12px;color:#9ca3af;line-height:1.5;">권한 팝업이 보이지 않으면 주소 기반으로 열립니다.</div>
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
          fromName: '현재위치',
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
        <div className="body-16-semibold text-neutral-50">장소 정보</div>
        <div className="body-14-semibold text-neutral-50 flex flex-col gap-2">
          <div className="flex gap-2.5 items-center">
            <MedalIcon />
            <div>
              <span className="text-primary-40 underline">{recordNumber}명</span>의 에디터가
              기록했어요
            </div>
          </div>
          <div className="flex gap-2.5 items-center">
            <FolderIcon className="text-primary-40 h-5.5 w-5.5" />
            <div>
              <span className="text-primary-40 underline">{place?.saveCount}명</span>의 아카이버가
              저장했어요
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
              onClick={handleClickOpenKakaoMap}
            >
              지도보기
            </button>
          </div>
          <div className="flex gap-2.5 items-center">
            <PhoneIcon className="text-primary-40 h-5.5 w-5.5" />
            {place?.phoneNumber}
          </div>
        </div>
      </section>

      <div className="pt-6 px-5">
        <Button className="w-full" onClick={handleClickOpenKakaoMapDirections}>
          지도에서 길 찾기
        </Button>
      </div>
    </div>
  );
};
