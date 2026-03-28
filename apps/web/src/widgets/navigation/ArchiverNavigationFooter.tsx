'use client';

import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/shared/lib/i18n/navigation';

import { LocationPinIcon, UserCircleIcon, HomeIcon, ProfileAddIcon } from '../../shared/ui/icon';

export const ARCHIVER_NAVIGATION_FOOTER_ITEMS = [
  {
    key: 'home',
    labelKey: 'home',
    href: '/archiver/home',
    icon: HomeIcon,
  },
  {
    key: 'follow',
    labelKey: 'follow',
    href: '/archiver/follow-list',
    icon: ProfileAddIcon,
  },
  {
    key: 'archive',
    labelKey: 'archive',
    href: '/archiver/my-archive',
    icon: LocationPinIcon,
  },
  {
    key: 'mypage',
    labelKey: 'mypage',
    href: '/mypage',
    icon: UserCircleIcon,
  },
] as const;

type ArchiverNavigationFooterKey = (typeof ARCHIVER_NAVIGATION_FOOTER_ITEMS)[number]['key'];

const ArchiverNavigationFooterItem = ({
  icon,
  label,
  isActive,
  href,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  href: string;
}): React.ReactElement => {
  const Icon = icon;

  return (
    <Link
      href={href}
      className={`
        w-20 h-14
        flex flex-col items-center justify-center gap-1
        ${isActive ? 'text-black' : 'text-neutral-40'}
      `}
    >
      <Icon />
      <div className="caption-12-semibold">{label}</div>
    </Link>
  );
};

export const ArchiverNavigationFooter = ({
  activeKey,
}: {
  activeKey?: ArchiverNavigationFooterKey;
}): React.ReactElement => {
  const pathname = usePathname() ?? '';
  const t = useTranslations('archiverNav');

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
              label={t(item.labelKey)}
              isActive={isActive}
              href={item.href}
            />
          );
        })}
      </div>
    </div>
  );
};
