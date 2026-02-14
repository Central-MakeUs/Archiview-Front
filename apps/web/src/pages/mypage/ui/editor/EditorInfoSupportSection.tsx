import React from 'react';

interface IEditorInfoSupportSectionProps {
  onContact?: () => void;
  onReportBug?: () => void;
}

export const EditorInfoSupportSection = ({
  onContact,
  onReportBug,
}: IEditorInfoSupportSectionProps): React.ReactElement => {
  return (
    <section>
      <h2 className="heading-20-bold px-5 pb-2 pt-6 text-neutral-90">정보 및 지원</h2>

      <button
        type="button"
        onClick={onContact}
        className="body-18-regular w-full px-5 py-3 text-left text-neutral-80"
      >
        문의하기
      </button>

      <div className="mx-5 border-b border-neutral-30" />

      <button
        type="button"
        onClick={onReportBug}
        className="body-18-regular w-full px-5 py-3 text-left text-neutral-80"
      >
        오류제보
      </button>

      <div className="mx-5 border-b border-neutral-30" />
    </section>
  );
};
