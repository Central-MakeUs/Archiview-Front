'use client';

import { ArchiviewLogoIcon, NotificationIcon, SettingsIcon } from '@/shared/ui/icon';

export const Header = (): React.ReactElement => {
  return (
    <div className="h-[60px] top-0 py-[12px] px-[20px]">
      <div className="flex items-center justify-between">
        <ArchiviewLogoIcon />
        <div className="flex items-center gap-[1.5px]">
          <NotificationIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};
