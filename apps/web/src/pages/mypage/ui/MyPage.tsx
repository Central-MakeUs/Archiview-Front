'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth, SwitchRoleError } from '@/entities/auth/hooks/useAuth';
import { LOCAL_STORAGE_KEYS, type StoredUserRole } from '@/shared/constants/localStorageKeys';
import { setRoleSwitchLoadingFlag } from '@/shared/constants/roleSwitchLoading';
import { ChangeRoleModal } from '@/entities/auth/ui/ChangeRoleModal';
import { useLogout } from '@/entities/auth/hooks/useLogout';
import { useWithdraw } from '@/entities/auth/hooks/useWithdraw';
import { openInAppBrowserOrBrowserNewTab } from '@/shared/lib/native-actions';
import { EditorMyPage } from './editor/EditorMyPage';
import { ArchiverMyPage } from './archiver/ArchiverMyPage';
import { useGetMyProfile } from '@/entities/archiver/profile/queries/useGetMyProfile';
import { WithDrawModal } from './WithDrawModal';
import { LogoutModal } from './LogoutModal';

const isStoredUserRole = (value: string | null): value is StoredUserRole => {
  return value === 'GUEST' || value === 'ARCHIVER' || value === 'EDITOR';
};

export const MyPage = (): React.ReactElement => {
  const termsOfServiceUrl = process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_URL;
  const geoLocationTermsOfServiceUrl = process.env.NEXT_PUBLIC_GEO_LOCATION_TERMS_OF_SERVICE_URL;
  const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
  const editorPolicyUrl = process.env.NEXT_PUBLIC_EDITOR_POLICY_URL;
  const editorAgreementUrl = process.env.NEXT_PUBLIC_EDITOR_AGREEMENT_URL;
  const enquiryUrl = process.env.NEXT_PUBLIC_ENQUIRY_URL;
  const errorReportUrl = process.env.NEXT_PUBLIC_ERROR_REPORT_URL;

  const router = useRouter();
  const { switchRole } = useAuth();
  const { logout } = useLogout();
  const { withdraw } = useWithdraw();
  const { data: myData } = useGetMyProfile({ useMock: false });

  const [role, setRole] = useState<StoredUserRole | null>(null);
  const [openChangeRoleModal, setOpenChangeRoleModal] = useState(false);
  const [openWithDrawModal, setOpenWithDrawModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.role);
      setRole(isStoredUserRole(stored) ? stored : null);
    } catch (e) {
      console.error('Failed to read role from localStorage', e);
    }
  }, []);

  // --- 공통 핸들러 ---
  const handleSwitchRole = useCallback(async () => {
    try {
      const nextRole = await switchRole();
      setRoleSwitchLoadingFlag();
      // setRole 호출 시 리렌더로 새 역할의 MyPage가 잠깐 보였다가 리다이렉트되는 깜빡임 발생
      // 곧바로 홈으로 이동하므로 state 업데이트 생략
      router.replace(nextRole === 'ARCHIVER' ? '/archiver/home' : '/editor/home');
    } catch (e) {
      if (e instanceof SwitchRoleError && e.code === 'USER_013') {
        setOpenChangeRoleModal(true);
        return;
      }
      console.error('Failed to switch role', e);
    }
  }, [router, switchRole]);

  const handleLogout = useCallback(() => {
    setOpenLogoutModal(true);
  }, []);

  const handleLogoutConfirm = useCallback(() => {
    setOpenLogoutModal(false);
    logout();
  }, [logout]);

  const openExternalUrl = useCallback(async (url: string | undefined) => {
    if (!url) {
      console.error('[MyPage] external url is missing');
      return;
    }

    try {
      await openInAppBrowserOrBrowserNewTab(url);
    } catch (e) {
      console.error('[MyPage] Failed to open external url via native bridge', e);
    }
  }, []);

  const handleWithdraw = useCallback(() => {
    setOpenWithDrawModal(true);
  }, []);

  const handleWithdrawConfirm = useCallback(() => {
    setOpenWithDrawModal(false);
    withdraw();
  }, [withdraw]);

  const handleContact = useCallback(() => {
    // eslint-disable-next-line no-void
    void openExternalUrl(enquiryUrl);
  }, [enquiryUrl, openExternalUrl]);

  const handleReportBug = useCallback(() => {
    // eslint-disable-next-line no-void
    void openExternalUrl(errorReportUrl);
  }, [errorReportUrl, openExternalUrl]);

  const handleTermsClick = useCallback(
    (key: string) => {
      if (key === 'service-terms') {
        // eslint-disable-next-line no-void
        void openExternalUrl(termsOfServiceUrl);
      } else if (key === 'location-terms') {
        // eslint-disable-next-line no-void
        void openExternalUrl(geoLocationTermsOfServiceUrl);
      } else if (key === 'editor-policy') {
        // eslint-disable-next-line no-void
        void openExternalUrl(editorPolicyUrl);
      } else if (key === 'privacy-policy') {
        // eslint-disable-next-line no-void
        void openExternalUrl(privacyPolicyUrl);
      } else if (key === 'open-license') {
        // eslint-disable-next-line no-void
        void openExternalUrl(editorAgreementUrl);
      }
    },
    [
      editorAgreementUrl,
      editorPolicyUrl,
      geoLocationTermsOfServiceUrl,
      openExternalUrl,
      privacyPolicyUrl,
      termsOfServiceUrl,
    ],
  );

  const commonHandlers = {
    onLogout: handleLogout,
    onWithdraw: handleWithdraw,
    onContact: handleContact,
    onReportBug: handleReportBug,
    onTermsClick: handleTermsClick,
    onSwitchRole: handleSwitchRole,
  };

  return (
    <>
      {role === 'EDITOR' ? (
        <EditorMyPage {...commonHandlers} />
      ) : (
        <ArchiverMyPage myData={myData?.data ?? null} {...commonHandlers} />
      )}

      <ChangeRoleModal
        isOpen={openChangeRoleModal}
        onClose={() => setOpenChangeRoleModal(false)}
        onConfirm={() => {
          setOpenChangeRoleModal(false);
          router.push('/register-editor');
        }}
      />

      <WithDrawModal
        isOpen={openWithDrawModal}
        onClose={() => setOpenWithDrawModal(false)}
        onConfirm={handleWithdrawConfirm}
      />

      <LogoutModal
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};
