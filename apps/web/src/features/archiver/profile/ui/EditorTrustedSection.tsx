import { CaretRightIcon } from '@/shared/ui/icon';
import { useGetEditorTrusted } from '@/entities/archiver/profile/queries/useGetEditorTrusted';
import { IPlace } from '@/entities/archiver/profile/model/archiverProfile.type';

import { EditorRecommendCard } from '../../../../entities/archiver/profile/ui/EditorRecommendCard';

// TODO : 믿고먹는 에디터 응답값이 이거맞는지..?
export const EditorTrustedSection = (): React.ReactElement => {
  const { data: EditorTrustedData, isLoading, isError } = useGetEditorTrusted({ useMock: true });

  if (isLoading) return <div className="mb-5">로딩중...</div>;
  if (isError) return <div className="mb-5">에러</div>;

  const EditorTrusted = EditorTrustedData?.data?.places ?? [];

  if (EditorTrusted.length === 0) {
    return (
      <section className="mb-5">
        <div className="flex justify-between mb-4">
          <span className="heading-20-bold">요즘 HOT한 장소</span>
        </div>
        <div>표시할 장소가 없습니다.</div>
      </section>
    );
  }

  return (
    <section className="mb-5">
      <div className="flex justify-between mb-4">
        <span className="heading-20-bold">믿고 먹는 에디터</span>
        <CaretRightIcon />
      </div>
      <div className="flex overflow-x-scroll gap-3 scroll-none">
        {EditorTrusted.map((editor: IPlace) => (
          <EditorRecommendCard
            key={editor.placeId}
            imageUrl={editor.placeImageUrl}
            placeName={editor.placeName}
            editorSummary={editor.editorSummary}
          />
        ))}
      </div>
    </section>
  );
};
