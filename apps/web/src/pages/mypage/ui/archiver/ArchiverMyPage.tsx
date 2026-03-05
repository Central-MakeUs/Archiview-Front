'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';

import { ArchiverInfoCard } from './ArchiverInfoCard';
import { AccountManagementSection, InfoSupportSection, TermsConditionsSection } from '../common';
import { EllipseArrowIcons } from '@/shared/ui/icon/EllipseArrowIcons';
import { IArchiverMyProfileResponseDTO } from '@/entities/archiver/profile/model/archiverProfile.type';

const ARCHIVER_TERMS_ITEMS = [
  { label: '서비스 이용약관', key: 'service-terms' },
  { label: '위치 기반 서비스 이용약관', key: 'location-terms' },
  { label: '개인정보 처리 방침', key: 'privacy-policy' },
] as const;

interface IArchiverMyPageProps {
  myData: IArchiverMyProfileResponseDTO['data'];
  onLogout: () => void;
  onWithdraw: () => void;
  onContact: () => void;
  onReportBug: () => void;
  onTermsClick: (key: string) => void;
  onSwitchRole: () => void;
}

export const ArchiverMyPage = ({
  myData,
  onLogout,
  onWithdraw,
  onContact,
  onReportBug,
  onTermsClick,
  onSwitchRole,
}: IArchiverMyPageProps): React.ReactElement => {
  const router = useRouter();

  const handleManageBlockedEditors = () => {
    router.push('blocked-editor');
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* 프로필 카드 */}
      <div className="px-5 pt-4">
        <ArchiverInfoCard
          nickname={myData?.nickname ?? ''}
          code={myData?.userId ? `#${myData.userId.slice(-4)}` : ''}
        />
      </div>

      {/* 계정관리 */}
      <AccountManagementSection
        onLogout={onLogout}
        onWithdraw={onWithdraw}
        extraItems={[{ label: '차단한 에디터 관리', onClick: handleManageBlockedEditors }]}
      />

      {/* 정보 및 지원 */}
      <InfoSupportSection onContact={onContact} onReportBug={onReportBug} />

      {/* 약관 및 정책 */}
      <TermsConditionsSection items={ARCHIVER_TERMS_ITEMS} onItemClick={onTermsClick} />

      {/* 하단 버전 + 역할 전환 */}
      <div className="mt-auto flex flex-col items-center gap-4 px-5 pb-8 pt-10">
        <span className="caption-12-regular text-neutral-40">버전 v.1.0</span>

        <Button
          variant="contained"
          fullwidth
          onClick={onSwitchRole}
          className="h-[67px] w-[228px] rounded-[999px]"
        >
          <EllipseArrowIcons className="mr-1" />
          에디터 모드로 전환
        </Button>
      </div>
    </div>
  );
};
