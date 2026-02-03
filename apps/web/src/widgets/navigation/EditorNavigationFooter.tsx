'use client';

import { useRouter, usePathname } from 'next/navigation';

import { HomeIcon, UserCircleIcon, ShareInformationIcon, SettingIcon } from '@/shared/ui/icon';

// TODO : 라우팅 수정
export const EDITOR_NAVIGATION_FOOTER_ITEMS = [
  {
    key: 'home',
    label: '홈',
    href: '',
    icon: HomeIcon,
  },
  {
    key: 'profile',
    label: '프로필',
    href: 'profile',
    icon: UserCircleIcon,
  },
  {
    key: 'share-information',
    label: '정보공유',
    href: 'register-place',
    icon: ShareInformationIcon,
  },
  {
    key: 'setting',
    label: '설정',
    href: '/mypage',
    icon: SettingIcon,
  },
] as const;

const EditorNavigationFooterItem = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}): React.ReactElement => {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className={`
        w-20 h-14
        flex flex-col items-center justify-center gap-1
        ${isActive ? 'text-black' : 'text-neutral-40'}
      `}
    >
      <Icon />
      <div className="caption-12-semibold">{label}</div>
    </button>
  );
};

export const EditorNavigationFooter = (): React.ReactElement => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-18 bottom-0 px-4 border-t border-neutral-40 pt-2 pb-3">
      <div className="flex items-center justify-between gap-2">
        {EDITOR_NAVIGATION_FOOTER_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <EditorNavigationFooterItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              isActive={isActive}
              onClick={() => router.push(item.href)}
            />
          );
        })}
      </div>
    </div>
  );
};
