'use client';

import { NotificationIcon, SettingsIcon } from '@/shared/ui/icon';

export const HeaderIcons = () => {
  return (
    <div className="flex items-center gap-px">
      <NotificationIcon onClick={() => console.log('알림 클릭')} />
      <SettingsIcon onClick={() => console.log('설정 클릭')} />
    </div>
  );
};
