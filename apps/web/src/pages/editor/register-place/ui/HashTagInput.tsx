'use client';

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { cn } from '@/shared/lib/cn';
import { Chip } from '@/shared/ui/Chip';
import { XIcon } from '@/shared/ui/icon/XIcon';

const MAX_TAG_COUNT = 3;
const MAX_TAG_LENGTH = 6;

export const HashTagInput = ({ className }: { className?: string }) => {
  const t = useTranslations('editorRegisterPlace.hashTag');
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
      setErrorMessage(t('errorMaxLength'));
      return;
    }

    if (tags.length >= MAX_TAG_COUNT) {
      setErrorMessage(t('errorMaxCount'));
      return;
    }

    if (tags.includes(trimmed)) {
      setErrorMessage(t('errorDuplicate'));
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
      <div className="group flex flex-col gap-2.5">
        <div className="flex justify-between">
          <p className="body-14-semibold mb-3">{t('label')}</p>
          <p className="caption-12-medium text-primary-40">{t('maxHint')}</p>
        </div>

        <div className="flex gap-3">
          <BoxInput
            state={errorMessage ? 'error' : 'default'}
            message={errorMessage ?? ''}
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
            {t('submit')}
          </button>
        </div>

        <div className={cn('flex flex-wrap gap-1', errorMessage && 'mt-3')}>
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
