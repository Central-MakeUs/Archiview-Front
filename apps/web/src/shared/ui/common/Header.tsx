'use client';

import { ArchiviewLogoIcon, NotificationIcon, SettingsIcon } from '@/shared/ui/icon';

export const Header = (): React.ReactElement => {
  return (
    <div className="h-15 top-0 py-3 px-5">
      <div className="flex items-center justify-between">
        <ArchiviewLogoIcon />
        <div className="flex items-center gap-px">
          <NotificationIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};
