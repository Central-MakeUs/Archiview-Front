'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth, SwitchRoleError } from '@/entities/auth/hooks/useAuth';
import { ChangeRoleModal } from '@/entities/auth/ui/ChangeRoleModal';
import { Button } from '@/shared/ui/button';

import { ArchiverInfoCard } from './ArchiverInfoCard';
import { ArchiverAccountManagementSection } from './ArchiverAccountManagementSection';
import { ArchiverInfoSupportSection } from './ArchiverInfoSupportSection';
import { ArchiverTermsConditionsSection } from './ArchiverTermsConditionsSection';
import { EllipseArrowIcons } from '@/shared/ui/icon/EllipseArrowIcons';
import { IArchiverMyProfileResponseDTO } from '@/entities/archiver/profile/model/archiverProfile.type';
import { useLogout } from '@/entities/auth/hooks/useLogout';

export const ArchiverMyPage = ({
  myData,
}: {
  myData: IArchiverMyProfileResponseDTO['data'];
}): React.ReactElement => {
  const router = useRouter();
  const { switchRole } = useAuth();
  const { logout } = useLogout();
  const [openChangeRoleModal, setOpenChangeRoleModal] = useState(false);

  const handleSwitchToEditor = useCallback(async () => {
    try {
      const nextRole = await switchRole();
      router.replace(nextRole === 'EDITOR' ? '/editor/home' : '/archiver/home');
    } catch (e) {
      if (e instanceof SwitchRoleError && e.code === 'USER_013') {
        setOpenChangeRoleModal(true);
        return;
      }
      console.error('Failed to switch role', e);
    }
  }, [router, switchRole]);

  const handleLogout = () => {
    logout();
  };

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 처리
  };

  const handleManageBlockedEditors = () => {
    router.push("blocked-editor")
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
          <ArchiverInfoCard
            nickname={myData?.nickname ?? ''}
            code={myData?.userId ? `#${myData.userId.slice(-4)}` : ''}
          />
        </div>

        {/* 계정관리 */}
        <ArchiverAccountManagementSection
          onLogout={handleLogout}
          onWithdraw={handleWithdraw}
          onManageBlockedEditors={handleManageBlockedEditors}
        />

        {/* 정보 및 지원 */}
        <ArchiverInfoSupportSection onContact={handleContact} onReportBug={handleReportBug} />

        {/* 약관 및 정책 */}
        <ArchiverTermsConditionsSection onItemClick={handleTermsClick} />

        {/* 하단 버전 + 역할 전환 */}
        <div className="mt-auto flex flex-col items-center gap-4 px-5 pb-8 pt-10">
          <span className="caption-12-regular text-neutral-40">버전 v.1.0</span>

          <Button
            variant="contained"
            fullwidth
            onClick={handleSwitchToEditor}
            className="h-[67px] w-[228px] rounded-[999px]"
          >
            <EllipseArrowIcons className="mr-1" />
            에디터 모드로 전환
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
