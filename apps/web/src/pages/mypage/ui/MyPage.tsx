'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from '@/shared/lib/i18n/navigation';

import { useAuth, SwitchRoleError } from '@/entities/auth/hooks/useAuth';
import Cookies from 'js-cookie';

import { COOKIE_KEYS, type StoredUserRole } from '@/shared/constants/cookies';
import { ChangeRoleModal } from '@/entities/auth/ui/ChangeRoleModal';
import { useLogout } from '@/entities/auth/hooks/useLogout';
import { useWithdraw } from '@/entities/auth/hooks/useWithdraw';
import { openInAppBrowserOrBrowserNewTab } from '@/shared/lib/native-actions';
import { EditorMyPage } from './editor/EditorMyPage';
import { ArchiverMyPage } from './archiver/ArchiverMyPage';
import { MyPageSkeleton } from './MyPageSkeleton';
import { useGetMyProfile } from '@/entities/archiver/profile/queries/useGetMyProfile';
import { useMinLoading } from '@/shared/hooks/useMinLoading';
import { WithDrawModal } from './WithDrawModal';
import { LogoutModal } from './LogoutModal';

const isStoredUserRole = (value: string | null): value is StoredUserRole => {
  return value === 'GUEST' || value === 'ARCHIVER' || value === 'EDITOR';
};

/** Locale 전환 등으로 클라이언트에서 다시 마운트될 때 첫 페인트부터 역할을 알 수 있게 함 */
const readRoleFromCookie = (): StoredUserRole | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = Cookies.get(COOKIE_KEYS.role) ?? null;
    return isStoredUserRole(stored) ? stored : null;
  } catch {
    return null;
  }
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
  const { data: myData, isLoading: isMyProfileLoading } = useGetMyProfile({ useMock: false });
  const showArchiverLoading = useMinLoading(isMyProfileLoading);

  const [role, setRole] = useState<StoredUserRole | null>(readRoleFromCookie);
  const [openChangeRoleModal, setOpenChangeRoleModal] = useState(false);
  const [openWithDrawModal, setOpenWithDrawModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  useEffect(() => {
    setRole(readRoleFromCookie());
  }, []);

  // --- 공통 핸들러 ---
  const handleSwitchRole = useCallback(async () => {
    try {
      const nextRole = await switchRole();
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

  if (role === null) return <MyPageSkeleton />;

  if (role !== 'EDITOR') {
    if (showArchiverLoading || !myData) return <MyPageSkeleton />;
    return (
      <>
        <ArchiverMyPage myData={myData.data} {...commonHandlers} />
        <ChangeRoleModal
          isOpen={openChangeRoleModal}
          onClose={() => setOpenChangeRoleModal(false)}
          onConfirm={() => {
            setOpenChangeRoleModal(false);
            router.push('/term-agree-editor');
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
  }

  return (
    <>
      <EditorMyPage {...commonHandlers} />

      <ChangeRoleModal
        isOpen={openChangeRoleModal}
        onClose={() => setOpenChangeRoleModal(false)}
        onConfirm={() => {
          setOpenChangeRoleModal(false);
          router.push('/term-agree-editor');
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
