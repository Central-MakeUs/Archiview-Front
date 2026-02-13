import React from 'react';
import { Button } from '@/shared/ui/button';

type TabValue = string | number;

interface ITabItem<T extends TabValue> {
  label: React.ReactNode;
  value: T;
}

interface IOptionTabsProps<T extends TabValue> {
  items: ITabItem<T>[];
  value: T;
  onChange: (next: T) => void;

  containerClassName?: string;
  buttonClassName?: string;

  activeClassName?: string;
  inactiveClassName?: string;
}

export const OptionTabs = <T extends TabValue>({
  items,
  value,
  onChange,
  containerClassName = 'flex gap-2 overflow-x-auto whitespace-nowrap scroll-none',
  buttonClassName = 'flex-none w-auto whitespace-nowrap transition-colors',
  activeClassName = 'bg-primary-40 text-white',
  inactiveClassName = 'bg-neutral-20 text-neutral-40',
}: IOptionTabsProps<T>) => {
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
};
