import { IEditor } from '@/entities/archiver/profile/model/archiverProfile.type';
import { EditorRecommendCard } from '@/entities/archiver/profile/ui/EditorRecommendCard';

interface IEditorTrustedSectionProps {
  editors: IEditor[];
}

export const EditorTrustedSection = ({
  editors,
}: IEditorTrustedSectionProps): React.ReactElement => {
  if (editors.length === 0) {
    return <div>표시할 에디터가 없습니다.</div>;
  }

  return (
    <section className="mb-5">
      <div className="flex justify-between mb-4">
        <span className="heading-20-bold">믿고 먹는 에디터</span>
      </div>
      <div className="flex overflow-x-scroll gap-3 scroll-none">
        {editors.map((editor: IEditor) => (
          <EditorRecommendCard key={editor.editorId} editor={editor} />
        ))}
      </div>
    </section>
  );
};
