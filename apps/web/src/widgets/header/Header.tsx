import { cn } from '@/shared/lib/cn';
import React from 'react';

interface IHeaderProps {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const Header = ({ title, left, right, className }: IHeaderProps) => {
  return (
    <header className={cn('flex h-15 w-full items-center border-none px-5', className)}>
      <div className="flex min-w-0 flex-1 items-center justify-start">
        {left ?? <span aria-hidden="true" />}
      </div>

      <div className="min-w-0 flex-none px-2">
        {title ? <h1 className="heading-20-bold">{title}</h1> : null}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
        {right ?? <span aria-hidden="true" />}
      </div>
    </header>
  );
};
