import { CaretRightIcon } from '@/shared/ui/icon';

import { EditorRecommendCard } from './EditorRecommendCard';

export const BelievedEditorSection = (): React.ReactElement => {
  return (
    <section className="mb-5">
      <div className="flex justify-between mb-4">
        <span className="heading-20-bold">믿고 먹는 에디터</span>
        <CaretRightIcon />
      </div>
      <div className="flex overflow-x-scroll gap-3 scroll-none">
        <EditorRecommendCard
          imageUrl="/images/TestImage.png"
          title="지도상의 장소 이름"
          address="주소주소"
        />
        <EditorRecommendCard
          imageUrl="/images/TestImage.png"
          title="지도상의 장소 이름"
          address="주소주소"
        />
        <EditorRecommendCard
          imageUrl="/images/TestImage.png"
          title="지도상의 장소 이름"
          address="주소주소"
        />
        <EditorRecommendCard
          imageUrl="/images/TestImage.png"
          title="지도상의 장소 이름"
          address="주소주소"
        />
      </div>
    </section>
  );
};
