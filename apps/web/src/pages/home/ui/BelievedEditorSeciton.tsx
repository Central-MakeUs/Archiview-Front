import { Badge } from '@/shared/ui/Badge';
import { CaretRightIcon, FolderIcon } from '@/shared/ui/icon';
import Image from 'next/image';

const BelievedEditorItem = ({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}): React.ReactElement => {
  return (
    <div className="shrink-0 h-52 w-46 rounded-2xl shadow-[0_0_11px_0_rgba(144,144,144,0.40)]">
      <div>
        <Image src={imageUrl} alt="" width={182} height={99} />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="body-14-semibold">{title}</span>
          <span>
            <FolderIcon />
          </span>
        </div>
        <div className="caption-12-regular text-neutral-50 mb-3">주소 ~로 000 까지</div>
        <div className="flex items-center gap-1">
          <span>
            <Badge variant="outlined" label="카테고리" color="primary-40" />
          </span>
          <span>
            <Badge variant="outlined" label="사용자 지정" color="secondary-50" />
          </span>
        </div>
      </div>
    </div>
  );
};

export const BelievedEditorSeciton = (): React.ReactElement => {
  return (
    <section className="mb-5">
      <div className="flex justify-between mb-4">
        <span className="heading-20-bold">믿고 먹는 에디터</span>
        <CaretRightIcon />
      </div>
      <div className="flex overflow-x-scroll gap-3 scroll-none">
        <BelievedEditorItem imageUrl="/images/TestImage.png" title="지도상의 장소 이름" />
        <BelievedEditorItem imageUrl="/images/TestImage.png" title="지도상의 장소 이름" />
        <BelievedEditorItem imageUrl="/images/TestImage.png" title="지도상의 장소 이름" />
        <BelievedEditorItem imageUrl="/images/TestImage.png" title="지도상의 장소 이름" />
      </div>
    </section>
  );
};
