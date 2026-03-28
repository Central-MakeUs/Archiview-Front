import React from 'react';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { BackButtonHeader } from '@/widgets/header';
import { COOKIE_KEYS, type StoredUserRole } from '@/shared/constants/cookies';

const isStoredUserRole = (value: string | undefined): value is StoredUserRole => {
  return value === 'GUEST' || value === 'ARCHIVER' || value === 'EDITOR';
};

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const t = await getTranslations('mypage');

  const cookieStore = await cookies();
  const roleCookie = cookieStore.get(COOKIE_KEYS.role)?.value;
  const role = isStoredUserRole(roleCookie) ? roleCookie : undefined;
  /** router.back()은 예전 /ko 히스토리로 가서 로케일이 섞임 → 현재 로케일로 홈 이동 */
  const backHref = role === 'EDITOR' ? '/editor/home' : '/archiver/home';

  return (
    <div className="flex h-dvh flex-col">
      <BackButtonHeader title={t('headerTitle')} replaceTo={backHref} />
      <main className="flex-1 min-h-0 overflow-y-auto scroll-none">{children}</main>
    </div>
  );
}
