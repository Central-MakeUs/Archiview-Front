'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';

import { EditorInfoCard } from './EditorInfoCard';
import { AccountManagementSection, InfoSupportSection, TermsConditionsSection } from '../common';
import { EllipseArrowIcons } from '@/shared/ui/icon/EllipseArrowIcons';
import { useEditorGetMyProfile } from '@/entities/editor/profile/queries/useEditorGetMyProfile';

const EDITOR_TERMS_ITEMS = [
  { label: '서비스 이용약관', key: 'service-terms' },
  { label: '위치 기반 서비스 이용약관', key: 'location-terms' },
  { label: '에디터 운영 정책', key: 'editor-policy' },
  { label: '개인정보 처리 방침', key: 'privacy-policy' },
] as const;

interface IEditorMyPageProps {
  onLogout: () => void;
  onWithdraw: () => void;
  onContact: () => void;
  onReportBug: () => void;
  onTermsClick: (key: string) => void;
  onSwitchRole: () => void;
}

export const EditorMyPage = ({
  onLogout,
  onWithdraw,
  onContact,
  onReportBug,
  onTermsClick,
  onSwitchRole,
}: IEditorMyPageProps): React.ReactElement => {
  const router = useRouter();
  const { data: editorUserData } = useEditorGetMyProfile();

  const handleEditProfile = () => {
    router.push('/mypage/edit-profile');
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* 프로필 카드 */}
      <div className="px-5 pt-4">
        <EditorInfoCard
          nickname={editorUserData?.data?.nickname ?? ''}
          instagramId={editorUserData?.data?.instagramId ?? ''}
          tags={editorUserData?.data?.hashtags ?? []}
          profileImageUrl={editorUserData?.data?.profileImageUrl ?? ''}
          onEdit={handleEditProfile}
        />
      </div>

      {/* 계정관리 */}
      <AccountManagementSection onLogout={onLogout} onWithdraw={onWithdraw} />

      {/* 정보 및 지원 */}
      <InfoSupportSection onContact={onContact} onReportBug={onReportBug} />

      {/* 약관 및 정책 */}
      <TermsConditionsSection items={EDITOR_TERMS_ITEMS} onItemClick={onTermsClick} />

      {/* 하단 버전 + 역할 전환 */}
      <div className="mt-auto flex flex-col items-center gap-4 px-5 pb-8 pt-10">
        <span className="caption-12-regular text-neutral-40">버전 v.1.0</span>

        <Button
          variant="contained"
          fullwidth
          onClick={onSwitchRole}
          className="rounded-[999px] w-[228px] h-[67px]"
        >
          <EllipseArrowIcons className="mr-1" />
          아카이버 모드로 전환
        </Button>
      </div>
    </div>
  );
};
