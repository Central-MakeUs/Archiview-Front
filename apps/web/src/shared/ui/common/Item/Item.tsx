import React from 'react';

import { cn } from '@/shared/lib/cn';

interface IItemProps {
  thumbnail: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disableActive?: boolean; // active css 효과 막기
}

export const Item = ({
  thumbnail,
  children,
  onClick,
  className,
  disableActive = false,
}: IItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex w-full bg-white items-center p-5',
        'cursor-pointer',
        !disableActive && 'active:border-t active:border-b active:border-primary-40',
        className,
      )}
    >
      {/* 이미지 */}
      <div className="shrink-0">{thumbnail}</div>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
};
