import { InstagramOutlineIcon } from '@/shared/ui/icon';
import { CursorIcon } from '@/shared/ui/icon/place-info/CursorIcon';
import { EyeIcon } from '@/shared/ui/icon/place-info/EyleIcon';
import { FolderIcon } from '@/shared/ui/icon/place-info/FolderIcon';
import Image from 'next/image';

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

export const RoundedHeaderSection = ({
  place,
  thumbnail,
}: {
  place?: IPlaceDetail;
  thumbnail: string;
}) => {
  return (
    <section className="relative mb-[86px]">
      <div className="h-[196px] overflow-hidden">
        <Image src={thumbnail} alt="" fill className="object-cover" />
      </div>
      <div
        className="
        h-[125px]
        absolute
        left-0
        right-0
        -bottom-[86px]
        pt-8
        px-5
        pb-5
        flex flex-col
        gap-6.5
        rounded-t-[32px]
        bg-neutral-10
        border-b
        border-b-[#DBDCDF]
      "
      >
        <div className="heading-20-semibold">장소이름</div>
        <div className="flex justify-center items-center gap-2 w-full caption-12-regular text-primary-50">
          <div className="flex items-center gap-1 px-2">
            <FolderIcon className="text-primary-30" />
            {place?.saveCount}
          </div>
          <div>|</div>
          <div className="flex items-center gap-1 px-2">
            <EyeIcon className="text-primary-30" />
            {place?.viewCount}
          </div>
          <div>|</div>
          <div className="flex items-center gap-1 px-2">
            <CursorIcon className="text-primary-30" />
            {place?.directionCount}
          </div>
          <div>|</div>
          <div className="flex items-center gap-1 px-2">
            <InstagramOutlineIcon className="text-primary-30" />
            {place?.instagramInflowCount}
          </div>
        </div>
      </div>
    </section>
  );
};
