'use client';

import { useState } from 'react';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { cn } from '@/shared/lib/cn';
import { Chip } from '@/shared/ui/Chip';

interface IHashTagInputProps {
  className?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const HashTagInput = ({ className, value = [], onChange }: IHashTagInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    const trimmed = inputValue.trim().replace(/^#+/, '');
    if (!trimmed) return;

    const newTags = value.includes(trimmed) ? value : [...value, trimmed];
    onChange?.(newTags);
    setInputValue('');
  };

  return (
    <div className={cn(className)}>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-row justify-between">
          <p className="body-14-semibold mb-3">게시글의 해시태그를 자유롭게 설정해보세요</p>
          <p className="caption-12-medium text-neutral-40">*선택</p>
        </div>
        <div className="flex flex-row gap-3">
          <BoxInput
            state="default"
            message="해시태그를 입력해주세요"
            rightSlot={
              value.length > 0 ? (
                <button type="button" onClick={() => onChange?.([])} aria-label="지우기">
                  <XIcon className="w-2.5" />
                </button>
              ) : undefined
            }
            className="flex-1"
          >
            <input
              placeholder="해시태그를 입력해주세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </BoxInput>
          <button
            type="button"
            className="w-16 h-12 text-center body-14-semibold bg-primary-40 rounded-xl text-neutral-10"
            onClick={handleAddTag}
          >
            입력
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {value.map((tag) => (
            <Chip
              key={tag}
              label={`#${tag}`}
              onClick={() => onChange?.(value.filter((t) => t !== tag))}
              className="h-9 px-4 rounded-xl body-14-semibold border-none bg-neutral-20 text-neutral-40"
              chipType="keyword"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
