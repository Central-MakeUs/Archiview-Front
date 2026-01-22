import React from 'react';

import { Button } from '@/shared/ui/button';

interface ITabItem<T extends string> {
  label: React.ReactNode;
  value: T;
}

interface IOptionTabsProps<T extends string> {
  items: ITabItem<T>[];
  value: T;
  onChange: (next: T) => void;

  /** 레이아웃 커스텀 (스크롤/패딩/갭 등) */
  containerClassName?: string;

  /** 버튼 공통 클래스 */
  buttonClassName?: string;

  /** 활성/비활성 상태 클래스 */
  activeClassName?: string;
  inactiveClassName?: string;
}

export function OptionTabs<T extends string>({
  items,
  value,
  onChange,
  containerClassName = 'flex gap-2 overflow-x-auto whitespace-nowrap scroll-none',
  buttonClassName = 'flex-none w-auto whitespace-nowrap transition-colors',
  activeClassName = 'bg-primary-40 text-white',
  inactiveClassName = 'bg-neutral-20 text-neutral-40',
}: IOptionTabsProps<T>) {
  return (
    <div className={containerClassName}>
      {items.map((t) => {
        const active = value === t.value;

        return (
          <Button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={[
              'h-9 px-3 rounded-xl body-14-semibold',
              buttonClassName,
              active ? activeClassName : inactiveClassName,
            ].join(' ')}
          >
            {t.label}
          </Button>
        );
      })}
    </div>
  );
}
