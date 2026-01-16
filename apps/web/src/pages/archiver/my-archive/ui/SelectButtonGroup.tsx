'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

type Category =
  | '전체'
  | '내주변'
  | '한식'
  | '양식'
  | '카페'
  | '햄버거'
  | '주점'
  | '데이트'
  | '기타';

const CATEGORIES: Category[] = [
  '전체',
  '내주변',
  '한식',
  '양식',
  '카페',
  '햄버거',
  '주점',
  '데이트',
  '기타',
];

interface ISelectButtonGroupProps {
  defaultValue?: Category;
  onChange?: (value: Category) => void;
  className?: string;
}

export const SelectButtonGroup = ({
  defaultValue = '전체',
  onChange,
  className,
}: ISelectButtonGroupProps) => {
  const [selected, setSelected] = useState<Category>(defaultValue);

  const handleSelect = (value: Category) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap [-webkit-overflow-scrolling:touch] scrollbar-hide">
        {CATEGORIES.map((label) => {
          const isActive = selected === label;

          return (
            <Button
              key={label}
              type="button"
              variant={isActive ? 'contained' : 'outlined'}
              onClick={() => handleSelect(label)}
              className={cn('h-10 rounded-full px-4 py-0 text-sm')}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
