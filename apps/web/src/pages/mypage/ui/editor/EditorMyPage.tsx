'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth, SwitchRoleError } from '@/entities/auth/hooks/useAuth';
import { ChangeRoleModal } from '@/entities/auth/ui/ChangeRoleModal';
import { Button } from '@/shared/ui/button';

import { EditorInfoCard } from './EditorInfoCard';
import { EditorAccountManagementSection } from './EditorAccountManagementSection';
import { EditorInfoSupportSection } from './EditorInfoSupportSection';
import { EditorTermsConditionsSection } from './EditorTermsConditionsSection';
import { EllipseArrowIcons } from '@/shared/ui/icon/EllipseArrowIcons';

export const EditorMyPage = (): React.ReactElement => {
  const router = useRouter();
  const { switchRole } = useAuth();
  const [openChangeRoleModal, setOpenChangeRoleModal] = useState(false);

  const handleSwitchToArchiver = useCallback(async () => {
    try {
      const nextRole = await switchRole();
      router.replace(nextRole === 'ARCHIVER' ? '/archiver/home' : '/editor/home');
    } catch (e) {
      if (e instanceof SwitchRoleError && e.code === 'USER_013') {
        setOpenChangeRoleModal(true);
        return;
      }
      console.error('Failed to switch role', e);
    }
  }, [router, switchRole]);

  const handleEditProfile = () => {
    // TODO: 프로필 편집 페이지로 이동
  };

  const handleLogout = () => {
    // TODO: 로그아웃 처리
  };

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 처리
  };

  const handleContact = () => {
    // TODO: 문의하기
  };

  const handleReportBug = () => {
    // TODO: 오류제보
  };

  const handleTermsClick = (key: string) => {
    // TODO: 약관/정책 상세 페이지로 이동
    console.log('terms click:', key);
  };

  return (
    <>
      <div className="flex flex-1 flex-col">
        {/* 프로필 카드 */}
        <div className="px-5 pt-4">
          <EditorInfoCard
            nickname="에디터 닉네임"
            instagramId="instagramid"
            tags={['커피맛집', '커피맛집']}
            onEdit={handleEditProfile}
          />
        </div>

        {/* 계정관리 */}
        <EditorAccountManagementSection onLogout={handleLogout} onWithdraw={handleWithdraw} />

        {/* 정보 및 지원 */}
        <EditorInfoSupportSection onContact={handleContact} onReportBug={handleReportBug} />

        {/* 약관 및 정책 */}
        <EditorTermsConditionsSection onItemClick={handleTermsClick} />

        {/* 하단 버전 + 역할 전환 */}
        <div className="mt-auto flex flex-col items-center gap-4 px-5 pb-8 pt-10">
          <span className="caption-12-regular text-neutral-40">버전 v.1.0</span>

          <Button
            variant="contained"
            fullwidth
            onClick={handleSwitchToArchiver}
            className="rounded-[999px] w-[228px] h-[67px]"
          >
            <EllipseArrowIcons className="mr-1" />
            아카이버 모드로 전환
          </Button>
        </div>
      </div>

      <ChangeRoleModal
        isOpen={openChangeRoleModal}
        onClose={() => setOpenChangeRoleModal(false)}
        onConfirm={() => {
          setOpenChangeRoleModal(false);
          router.push('/register-editor');
        }}
      />
    </>
  );
};
