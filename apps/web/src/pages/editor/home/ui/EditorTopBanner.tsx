import Image from 'next/image';
import Link from 'next/link';

import { Chip } from '@/shared/ui/Chip';
import { RightArrowIcon } from '@/shared/ui/icon';

export const EditorTopBanner = () => {
  return (
    <div className="relative w-full h-62.75 bg-primary-30 rounded-b-4xl px-5 pt-8 pb-6">
      <Image
        src="/images/MainMarkerIcon.svg"
        alt="MainMarkerImage"
        width={190}
        height={190}
        className="absolute top-12 right-1"
      />
      <Chip label="에디터" className="rounded-xl border-none bg-primary-40 text-white" />
      <div className="pt-3">
        <p className="heading-24-bold">닉네임에디터님,</p>
        <span className="heading-20-semibold">
          총 <span className="text-primary-40 underline">31</span>개의 장소를
          <br />
          아카이뷰에 공유했어요
        </span>
        <p className="pt-3 body-14-regular text-primary-50">소중한 정보를 공유해주세요</p>
      </div>

      <Link
        href="/editor/register-place"
        className="flex flex-row pt-4 justify-end items-center gap-1"
      >
        <p className="underline caption-12-regular text-white">지금 공유하러 가기</p>
        <RightArrowIcon className="h-2.5 text-white" />
      </Link>
    </div>
  );
};
