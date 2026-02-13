import { CursorIcon } from '@/shared/ui/icon/place-info/CursorIcon';
import { FolderIcon } from '@/shared/ui/icon/place-info/FolderIcon';
import { MedalIcon } from '@/shared/ui/icon/place-info/MedalIcon';
import { PinIcon } from '@/shared/ui/icon/place-info/PinIcon';

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
            <span className="text-primary-40 underline">{place?.saveCount}명</span>의 아카이버가
            저장했어요
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[10px] items-center">
            <PinIcon className="text-primary-40 h-[22px] w-[22px]" />
            {place?.addressName}
          </div>
          {/* TODO : 지도 연결 */}
          {/* <div className="text-primary-40 underline">지도보기</div> */}
        </div>
        <div className="flex gap-[10px] items-center">
          <CursorIcon className="text-primary-40 h-[22px] w-[22px]" />
          {place?.nearestStationWalkTime}
        </div>
      </div>
    </section>
  );
};
