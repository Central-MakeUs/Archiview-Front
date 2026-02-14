import React from 'react';

interface IEditorAccountManagementSectionProps {
  onLogout?: () => void;
  onWithdraw?: () => void;
}

export const EditorAccountManagementSection = ({
  onLogout,
  onWithdraw,
}: IEditorAccountManagementSectionProps): React.ReactElement => {
  return (
    <section>
      <h2 className="heading-20-bold px-5 pb-2 pt-6 text-neutral-90">계정관리</h2>

      <button
        type="button"
        onClick={onLogout}
        className="body-18-regular w-full px-5 py-3 text-left text-neutral-80"
      >
        로그아웃
      </button>

      <div className="mx-5 border-b border-neutral-30" />

      <button
        type="button"
        onClick={onWithdraw}
        className="body-18-regular w-full px-5 py-3 text-left text-neutral-80"
      >
        회원탈퇴
      </button>

      <div className="mx-5 border-b border-neutral-30" />
    </section>
  );
};
