'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/shared/lib/i18n/navigation';

import { Button } from '@/shared/ui/button';

import { EditorInfoCard } from './EditorInfoCard';
import { AccountManagementSection, InfoSupportSection, TermsConditionsSection } from '../common';
import { MyPageSkeleton } from '../MyPageSkeleton';
import { EllipseArrowIcons } from '@/shared/ui/icon/EllipseArrowIcons';
import { useEditorGetMyProfile } from '@/entities/editor/profile/queries/useEditorGetMyProfile';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

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
  const t = useTranslations('mypage');
  const tEditorTerms = useTranslations('mypage.editorTerms');

  const editorTermsItems = [
    { label: tEditorTerms('service'), key: 'service-terms' },
    { label: tEditorTerms('location'), key: 'location-terms' },
    { label: tEditorTerms('editorPolicy'), key: 'editor-policy' },
    { label: tEditorTerms('privacy'), key: 'privacy-policy' },
  ] as const;

  const { data: editorUserData, isLoading: isEditorProfileLoading } = useEditorGetMyProfile();
  const showLoading = useMinLoading(isEditorProfileLoading);

  const handleEditProfile = () => {
    router.push('/mypage/edit-profile');
  };

  if (showLoading || !editorUserData) return <MyPageSkeleton />;

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
      <TermsConditionsSection items={editorTermsItems} onItemClick={onTermsClick} />

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
          {t('switchToArchiver')}
        </Button>
      </div>
    </div>
  );
};
