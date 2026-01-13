'use client';

import { LocationPinIcon, UserCircleIcon, HomeIcon, NavigationFooterFolderIcon } from '../icon';

const NavigationFooterItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}): React.ReactElement => {
  return (
    <button className="w-20 h-14 flex flex-col items-center justify-center gap-1">
      <div>{icon}</div>
      <div className="caption-12-semibold">{label}</div>
    </button>
  );
};

export const NavigationFooter = (): React.ReactElement => {
  return (
    <div className="h-18 bottom-0 px-4 border-t border-neutral-40 pt-2 pb-3">
      <div className="flex items-center justify-between gap-2">
        <NavigationFooterItem icon={<HomeIcon />} label="홈" />
        <NavigationFooterItem icon={<NavigationFooterFolderIcon />} label="팔로우" />
        <NavigationFooterItem icon={<LocationPinIcon />} label="아카이브" />
        <NavigationFooterItem icon={<UserCircleIcon />} label="마이페이지" />
      </div>
    </div>
  );
};
