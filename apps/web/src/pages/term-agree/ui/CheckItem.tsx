'use client';

import { CheckBoxIcon, RightArrowIcon } from '@/shared/ui/icon';
import { cn } from '@/shared/lib/cn';

interface ICheckItem {
  children: React.ReactNode;
  className?: string;
  checked: boolean;
  endArrowIcon?: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** 체크 안 됐을 때만 클릭 시 이 URL로 리다이렉트. 체크됐을 때는 리다이렉트 없이 토글만 */
  redirectUrl?: string;
}

export const CheckItem = ({
  children,
  className,
  checked,
  onCheckedChange,
  endArrowIcon = true,
  redirectUrl,
}: ICheckItem) => {
  const handleRowClick = () => {
    if (redirectUrl) {
      if (!checked) {
        window.open(redirectUrl, '_blank');
        onCheckedChange(true);
      } else {
        onCheckedChange(false);
      }
    } else {
      onCheckedChange(!checked);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleRowClick()}
      className={cn(
        'flex flex-row py-4 px-5 items-center justify-between rounded-xl cursor-pointer',
        className,
      )}
    >
      <div className="flex flex-row">
        <CheckBoxIcon
          className={cn('mr-3 pointer-events-none', checked ? 'text-primary-40' : 'text-neutral-40')}
        />
        {children}
      </div>
      {endArrowIcon && <RightArrowIcon className="text-neutral-70" />}
    </div>
  );
};
