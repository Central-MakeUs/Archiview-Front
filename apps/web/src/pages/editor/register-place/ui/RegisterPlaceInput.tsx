'use client';

import { useState } from 'react';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { cn } from '@/shared/lib/cn'
import { ValidateInstagramUrl } from '@/shared/utils/validation/ValidateInstagramUrl';

interface IRegisterPlaceInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const InstagramUrlInput = ({
  className,
  value: controlledValue,
  onChange,
}: IRegisterPlaceInputProps) => {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue =
    onChange !== undefined
      ? (v: string) => {
          onChange(v);
        }
      : setInternalValue;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setSuccessMessage(null);
      setErrorMessage('인스타그램 프로필 링크를 입력해주세요.');
      return;
    }
    if (!ValidateInstagramUrl(trimmed)) {
      setSuccessMessage(null);
      setErrorMessage('올바른 인스타그램 URL을 입력해주세요.');
      return;
    }
    setErrorMessage(null);
    setSuccessMessage('올바른 URL입니다.');
    // TODO: 유효한 URL 처리 (API 연동 등)
  };

  const handleClear = () => {
    setValue('');
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <div className={cn(className)}>
      <div className="flex flex-row justify-between">
        <p className="body-14-semibold mb-3">인스타그램 URL</p>
        <p className="caption-12-medium text-primary-40">*필수</p>
      </div>
      <div className="flex flex-row gap-3">
        <BoxInput
          state={errorMessage ? 'error' : successMessage ? 'success' : 'default'}
          message={errorMessage ?? successMessage ?? '인스타그램 프로필 링크를 입력해주세요'}
          rightSlot={
            <button type="button" onClick={handleClear} aria-label="지우기">
              <XIcon className="w-2.5" />
            </button>
          }
          className="flex-1"
        >
          <input
            placeholder="인스타그램 프로필 링크를 입력해주세요"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (errorMessage) setErrorMessage(null);
              if (successMessage) setSuccessMessage(null);
            }}
          />
        </BoxInput>
        <button
          type="button"
          className="w-16 h-12 text-center body-14-semibold bg-primary-40 rounded-xl text-neutral-10"
          onClick={handleSubmit}
        >
          입력
        </button>
      </div>
    </div>
  );
};

export const HashTagInput = ({ className, value = '', onChange }: IRegisterPlaceInputProps) => {
  return (
    <div className={cn(className)}>
      <div className="flex flex-row justify-between">
        <p className="body-14-semibold mb-3">게시글의 해시태그를 자유롭게 설정해보세요</p>
        <p className="caption-12-medium text-neutral-40">*선택</p>
      </div>
      <div className="flex flex-row gap-3">
        {/* TODO : 해시태그 칩? 추가 */}
        <BoxInput
          state="default"
          message="해시태그를 입력해주세요"
          rightSlot={
            value ? (
              <button type="button" onClick={() => onChange?.('')} aria-label="지우기">
                <XIcon className="w-2.5" />
              </button>
            ) : undefined
          }
          className="flex-1"
        >
          <input
            placeholder="해시태그를 입력해주세요"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        </BoxInput>
        <button
          type="button"
          className="w-16 h-12 text-center body-14-semibold bg-primary-40 rounded-xl text-neutral-10"
        >
          입력
        </button>
      </div>
    </div>
  );
};
