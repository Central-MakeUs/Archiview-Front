'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth, SwitchRoleError } from '@/entities/auth/hooks/useAuth';
import { LOCAL_STORAGE_KEYS, type StoredUserRole } from '@/shared/constants/localStorageKeys';
import { ChangeRoleModal } from '@/entities/auth/ui/ChangeRoleModal';

const isStoredUserRole = (value: string | null): value is StoredUserRole => {
  return value === 'GUEST' || value === 'ARCHIVER' || value === 'EDITOR';
};

export const MyPage = (): React.ReactElement => {
  const router = useRouter();
  const { switchRole, changeRoleMutation } = useAuth();

  const [role, setRole] = useState<StoredUserRole | null>(null);
  const [openChangeRoleModal, setOpenChangeRoleModal] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.role);
      setRole(isStoredUserRole(stored) ? stored : null);
    } catch (e) {
      console.error('Failed to read role from localStorage', e);
    }
  }, []);

  const onToggleRole = useCallback(async () => {
    try {
      const nextRole = await switchRole();
      setRole(nextRole);
      router.replace(nextRole === 'ARCHIVER' ? '/archiver/home' : '/editor/home');
    } catch (e) {
      if (e instanceof SwitchRoleError && e.code === 'USER_013') {
        setOpenChangeRoleModal(true);
        return;
      }
      console.error('Failed to switch role', e);
    }
  }, [router, switchRole]);

  const onConfirmRegisterEditor = () => {
    setOpenChangeRoleModal(false);
    router.push('/register-editor');
  };

  return (
    <>
      <div className="p-5">
        <div className="body-16-semibold">MyPage</div>

        <div className="mt-4 flex items-center justify-between">
          <span className="body-14-regular text-neutral-60">현재 역할</span>
          <span className="body-14-semibold">{role ?? '-'}</span>
        </div>

        <button
          type="button"
          onClick={onToggleRole}
          disabled={changeRoleMutation.isPending}
          className="mt-6 w-full rounded-default bg-neutral-90 py-3 text-white disabled:bg-neutral-30"
        >
          역할 토글 (ARCHIVER ↔ EDITOR)
        </button>

        <p className="mt-3 text-xs text-neutral-50">
          개발용: localStorage에 role 저장 후 role 홈으로 이동합니다.
        </p>
      </div>
      
      <ChangeRoleModal
        isOpen={openChangeRoleModal}
        onClose={() => setOpenChangeRoleModal(false)}
        onConfirm={onConfirmRegisterEditor}
      />
    </>
  );
};
