'use client';

import { useRouter, usePathname } from 'next/navigation';

import { LocationPinIcon, UserCircleIcon, HomeIcon, ProfileAddIcon } from '../../shared/ui/icon';

// TODO : 라우팅 수정
export const ARCHIVER_NAVIGATION_FOOTER_ITEMS = [
  {
    key: 'home',
    label: '홈',
    href: '/archiver/home',
    icon: HomeIcon,
  },
  {
    key: 'follow',
    label: '팔로우',
    href: '/archiver/follow-list',
    icon: ProfileAddIcon,
  },
  {
    key: 'archive',
    label: '아카이브',
    href: '/archiver/my-archive',
    icon: LocationPinIcon,
  },
  {
    key: 'mypage',
    label: '마이페이지',
    href: '/mypage',
    icon: UserCircleIcon,
  },
] as const;

type ArchiverNavigationFooterKey = (typeof ARCHIVER_NAVIGATION_FOOTER_ITEMS)[number]['key'];

const ArchiverNavigationFooterItem = ({
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

export const ArchiverNavigationFooter = ({
  activeKey,
}: {
  activeKey?: ArchiverNavigationFooterKey;
}): React.ReactElement => {
  const router = useRouter();
  const pathname = usePathname() ?? '';

  return (
    <div className="h-18 bottom-0 px-4 border-t border-neutral-40 pt-2 pb-3 z-50 bg-white">
      <div className="flex items-center justify-between gap-2">
        {ARCHIVER_NAVIGATION_FOOTER_ITEMS.map((item) => {
          const isActive =
            activeKey === item.key ||
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <ArchiverNavigationFooterItem
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
