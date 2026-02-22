import { FolderIcon } from '@/shared/ui/icon/place-info/FolderIcon';
import { MedalIcon } from '@/shared/ui/icon/place-info/MedalIcon';
import PhoneIcon from '@/shared/ui/icon/place-info/PhoneIcon';
import { PinIcon } from '@/shared/ui/icon/place-info/PinIcon';

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
  const handleClickOpenKakaoMap = () => {
    const address = (place?.roadAddressName || place?.addressName)?.trim();
    if (!address) return;

    const url = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;

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

  return (
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
  );
};
