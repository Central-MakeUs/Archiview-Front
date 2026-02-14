import React from 'react';

import { cn } from '@/shared/lib/cn';

interface ICard {
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Kard = ({ selected = false, children, onClick, className }: ICard) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={cn(
        'w-full cursor-pointer bg-white',
        'rounded-default',
        'transition-colors',
        selected ? 'border-[1.2px] border-primary-40' : 'border border-neutral-30',
        className,
      )}
    >
      {children}
    </div>
  );
};