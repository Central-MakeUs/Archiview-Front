import { IEditorInsightPlaceDetail } from '@/entities/editor/place/model/editorPlace.type';
import { createKakaoMapSearchUrl, normalizeKakaoMapSearchQuery } from '@/shared/constants/url';
import {
  isAppWebView,
  openExternalLinkInWebViewOrBrowser,
  tryOpenExternalUrlViaNative,
} from '@/shared/lib/native-actions';
import { FolderIcon } from '@/shared/ui/icon/place-info/FolderIcon';
import { MedalIcon } from '@/shared/ui/icon/place-info/MedalIcon';
import PhoneIcon from '@/shared/ui/icon/place-info/PhoneIcon';
import { PinIcon } from '@/shared/ui/icon/place-info/PinIcon';

const createKakaoMapAppSearchUrl = (query: string) => {
  return `kakaomap://search?q=${encodeURIComponent(normalizeKakaoMapSearchQuery(query))}`;
};

export const InfoSection = ({
  place,
  recordNumber,
}: {
  place?: IEditorInsightPlaceDetail;
  recordNumber?: number;
}) => {
  const handleClickOpenKakaoMap = async () => {
    const address = (place?.address.roadAddress || place?.address.addressName)?.trim();
    if (!address) return;

    const webUrl = createKakaoMapSearchUrl(address);
    const appUrl = createKakaoMapAppSearchUrl(address);

    if (isAppWebView()) {
      const openedByApp = await tryOpenExternalUrlViaNative(appUrl);
      if (!openedByApp) {
        openExternalLinkInWebViewOrBrowser(webUrl);
      }
      return;
    }

    openExternalLinkInWebViewOrBrowser(webUrl);
  };

  return (
    <section className="p-5 gap-3 flex flex-col border-b-[#DBDCDF] border-b">
      <div className="body-16-semibold text-neutral-50">장소 정보</div>
      <div className="body-14-semibold text-neutral-50 flex flex-col gap-2">
        <div className="flex gap-[10px] items-center">
          <MedalIcon />
          <div>
            <span className="text-primary-40 underline">{recordNumber}명</span>의 에디터가
            기록했어요
          </div>
        </div>
        <div className="flex gap-[10px] items-center">
          <FolderIcon className="text-primary-40 h-[22px] w-[22px]" />
          <div>
            <span className="text-primary-40 underline">{place?.stats.saveCount}명</span>의
            아카이버가 저장했어요
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[10px] items-center">
            <PinIcon className="text-primary-40 h-[22px] w-[22px]" />
            {place?.address.addressName}
          </div>
          <button
            type="button"
            className="text-primary-40 underline cursor-pointer bg-transparent border-0 p-0"
            onClick={() => {
              handleClickOpenKakaoMap().catch(() => undefined);
            }}
          >
            지도보기
          </button>
        </div>
        <div className="flex gap-[10px] items-center">
          <PhoneIcon className="text-primary-40 h-[22px] w-[22px]" />
          {place?.phoneNumber}
        </div>
      </div>
    </section>
  );
};
