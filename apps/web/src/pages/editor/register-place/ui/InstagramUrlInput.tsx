'use client';

import { cn } from '@/shared/lib/cn';
import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { ValidateInstagramUrl } from '@/shared/utils/validation/ValidateInstagramUrl';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

export const InstagramUrlInput = ({ className }: { className: string }) => {
  const {
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleValidate = () => {
    const value = getValues('url')?.trim();

    if (!value) {
      setSuccessMessage(null);
      setError('url', { message: '인스타그램 프로필 링크를 입력해주세요.' });
      return;
    }

    if (!ValidateInstagramUrl(value)) {
      setSuccessMessage(null);
      setError('url', { message: '올바른 인스타그램 URL을 입력해주세요.' });
      return;
    }

    clearErrors('url');
    setValue('url', value, { shouldValidate: true });
    setSuccessMessage('올바른 URL입니다.');
    setIsEditing(false);
  };

  const handleClear = () => {
    setValue('url', '');
    clearErrors('url');
    setSuccessMessage(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage(null);
  };

  const errorMessage = errors.url?.message as string | undefined;
  const urlValue = getValues('url') ?? '';
  const isUrlExists = urlValue !== '';
  const isInputDisabled = isUrlExists && !isEditing;

  return (
    <div className={cn(className)}>
      <div className="flex justify-between">
        <p className="body-14-semibold mb-3">인스타그램 URL</p>
        <p className="caption-12-medium text-primary-40">*필수</p>
      </div>

      <div className="flex gap-3">
        <BoxInput
          state={errorMessage ? 'error' : successMessage ? 'success' : 'default'}
          message={errorMessage ?? successMessage ?? '인스타그램 프로필 링크를 입력해주세요'}
          disabledStyle={isInputDisabled}
          rightSlot={
            !isInputDisabled ? (
              <button type="button" onClick={handleClear} aria-label="지우기">
                <XIcon className="w-2.5" />
              </button>
            ) : null
          }
          className="flex-1"
        >
          <input
            className={cn(isInputDisabled && 'text-neutral-40')}
            disabled={isInputDisabled}
            placeholder="인스타그램 프로필 링크를 입력해주세요"
            {...register('url')}
            onChange={(e) => {
              setValue('url', e.target.value);
              if (errorMessage) clearErrors('url');
              if (successMessage) setSuccessMessage(null);
            }}
          />
        </BoxInput>
        {!isUrlExists && (
          <button
            type="button"
            onClick={handleValidate}
            className="w-16 h-12 body-14-semibold bg-primary-40 rounded-xl text-neutral-10"
          >
            입력
          </button>
        )}
        {isUrlExists && !isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="w-16 h-12 body-14-semibold bg-primary-50 rounded-xl text-neutral-10"
          >
            수정
          </button>
        )}
        {isUrlExists && isEditing && (
          <button
            type="button"
            onClick={handleValidate}
            className="w-16 h-12 body-14-semibold bg-primary-40 rounded-xl text-neutral-10"
          >
            입력
          </button>
        )}
      </div>
    </div>
  );
};
