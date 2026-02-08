'use client';

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { cn } from '@/shared/lib/cn';
import { Chip } from '@/shared/ui/Chip';
import { XIcon } from '@/shared/ui/icon/XIcon';

const MAX_TAG_COUNT = 3;
const MAX_TAG_LENGTH = 6;

export const HashTagInput = ({ className }: { className?: string }) => {
  const { control, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tags: string[] =
    useWatch({
      control,
      name: 'hashTags',
    }) ?? [];

  const handleAddTag = () => {
    const trimmed = inputValue.trim().replace(/^#+/, '');
    if (!trimmed) return;

    if (trimmed.length > MAX_TAG_LENGTH) {
      setErrorMessage('해시태그는 최대 6글자까지 입력할 수 있어요');
      return;
    }

    if (tags.length >= MAX_TAG_COUNT) {
      setErrorMessage('해시태그는 최대 3개까지 추가할 수 있어요');
      return;
    }

    if (tags.includes(trimmed)) {
      setErrorMessage('이미 추가된 해시태그예요');
      return;
    }

    setValue('hashTags', [...tags, trimmed], { shouldDirty: true });
    setInputValue('');
    setErrorMessage(null);
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      'hashTags',
      tags.filter((t) => t !== tag),
      { shouldDirty: true },
    );
  };

  return (
    <div className={cn(className)}>
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between">
          <p className="body-14-semibold mb-3">게시글의 해시태그를 자유롭게 설정해보세요</p>
          <p className="caption-12-medium text-neutral-40">*선택</p>
        </div>

        <div className="flex gap-3">
          <BoxInput
            state={errorMessage ? 'error' : 'default'}
            message={errorMessage ?? '해시태그를 입력해주세요'}
            className="flex-1"
          >
            <input
              placeholder="해시태그를 입력해주세요"
              value={inputValue}
              onChange={(e) => {
                const v = e.target.value.replace(/^#+/, '');
                setInputValue(v);
                if (errorMessage) setErrorMessage(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
          </BoxInput>

          <button
            type="button"
            onClick={handleAddTag}
            className="w-16 h-12 body-14-semibold bg-primary-40 rounded-xl text-neutral-10"
          >
            입력
          </button>
        </div>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={`#${tag}`}
              onClick={() => handleRemoveTag(tag)}
              className="h-9 px-4 rounded-xl body-14-semibold border-none bg-neutral-20 text-neutral-40"
              chipType="keyword"
              endIcon={<XIcon className="w-2.5" />}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
