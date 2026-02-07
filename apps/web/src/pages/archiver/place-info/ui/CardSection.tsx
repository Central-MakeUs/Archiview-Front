import { Chip } from '@/shared/ui/Chip';
import { PencilIcon } from '@/shared/ui/icon/place-info/PencilIcon';
import Image from 'next/image';

export const CardSection = () => {
  return (
    <section className="p-5 flex flex-col gap-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex h-[127px]">
          <div className="rounded-l-default bg-neutral-40 w-20"></div>
          <div className="rounded-r-default bg-[#F7F7F8] w-full flex flex-col gap-1 py-3 pl-3 pr-5">
            <div className="flex justify-between">
              <div className="body-14-pretendard">06.23 업데이트</div>
              <div className="flex gap-1">
                <button>
                  <Image
                    src="/images/instagramColoredIcon.svg"
                    alt="인스타 아이콘"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </button>
                <button>  
                  <PencilIcon />
                </button>
              </div>
            </div>
            <div className="caption-12-regular text-neutral-50">
              크루아상은 12시 이후에 가야 좋아요! 1~2시 사이에 가면 방금 구운 크루아상을 먹을 수
              있어요
            </div>
            <div className="flex gap-1">
              <Chip label="카페" className="bg-primary-40 text-neutral-10 border-none" />
              <Chip label="커피맛집" className="bg-primary-10 text-primary-40 border-none" />
              <Chip label="카페맛집" className="bg-primary-10 text-primary-40 border-none" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
