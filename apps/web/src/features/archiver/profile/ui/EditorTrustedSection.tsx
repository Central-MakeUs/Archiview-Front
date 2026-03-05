import { memo } from 'react';

import { IEditor } from '@/entities/archiver/profile/model/archiverProfile.type';
import { EditorRecommendCard } from '@/entities/archiver/profile/ui/EditorRecommendCard';

interface IEditorTrustedSectionProps {
  editors: IEditor[];
  isLoading?: boolean;
}

const EditorTrustedSectionComponent = ({
  editors,
  isLoading = false,
}: IEditorTrustedSectionProps): React.ReactElement => {
  if (isLoading) {
    return (
      <section className="mb-5">
        <div className="flex justify-between mb-4 pl-2">
          <span className="heading-20-bold">믿고 먹는 에디터</span>
        </div>
        <div className="-mx-5 overflow-x-auto scroll-none momentum-scroll-x py-3 -my-3">
          <div className="flex gap-3 pl-5 pr-5">
            {[0, 1, 2].map((index) => (
              <div
                key={`editor-trusted-skeleton-${index}`}
                className="w-45 shrink-0 overflow-hidden rounded-default bg-white shadow-default"
              >
                <div className="h-[99px] animate-pulse bg-neutral-20" />
                <div className="p-3">
                  <div className="mb-2 h-5 w-1/2 animate-pulse rounded bg-neutral-20" />
                  <div className="mb-3 h-4 w-full animate-pulse rounded bg-neutral-20" />
                  <div className="flex gap-1">
                    <div className="h-5 w-12 animate-pulse rounded-xl bg-neutral-20" />
                    <div className="h-5 w-16 animate-pulse rounded-xl bg-neutral-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (editors.length === 0) {
    return <div>표시할 에디터가 없습니다.</div>;
  }

  return (
    <section className="mb-5">
      <div className="flex justify-between mb-4 pl-2">
        <span className="heading-20-bold">믿고 먹는 에디터</span>
      </div>
      <div className="-mx-5 overflow-x-auto scroll-none momentum-scroll-x py-3 -my-3">
        <div className="flex gap-3 pl-5 pr-5">
          {editors.map((editor: IEditor) => (
            <EditorRecommendCard key={editor.editorId} editor={editor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const EditorTrustedSection = memo(EditorTrustedSectionComponent);
EditorTrustedSection.displayName = 'EditorTrustedSection';
