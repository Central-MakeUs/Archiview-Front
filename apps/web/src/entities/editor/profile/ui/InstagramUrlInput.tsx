import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/cn';
import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { Button } from '@/shared/ui/button';

interface IInstagramUrlInputProps {
  value: string;
  onChange: (value: string) => void;
  disabledCheck?: boolean;
  onDisabledChange?: (locked: boolean) => void;
  className?: string;
  /** true이면 마운트 시 이미 검증 완료(disabled) 상태로 시작 */
  initialValidated?: boolean;
}

type ValidationResult =
  | { state: 'default'; message?: undefined }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };

const validateInstagramUrl = (raw: string): ValidationResult => {
  const v = raw.trim();
  if (!v) return { state: 'error', message: '링크를 입력해주세요.' };

  const normalized = v.replace(/^https?:\/\//, '').replace(/^www\./, '');
  const ok = normalized.startsWith('instagram.com/');

  return ok
    ? { state: 'success', message: '인스타그램 링크가 정상적으로 인식됐어요' }
    : { state: 'error', message: '링크는 https://www.instagram.com 으로 시작해야 해요' };
};

export const InstagramUrlInput = ({
  value,
  onChange,
  onDisabledChange,
  className,
  initialValidated = false,
}: IInstagramUrlInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [validation, setValidation] = useState<ValidationResult>(
    initialValidated
      ? { state: 'success', message: '인스타그램 링크가 정상적으로 인식됐어요' }
      : { state: 'default' },
  );
  const [hasValidated, setHasValidated] = useState(initialValidated);

  const isDisabled = hasValidated && validation.state === 'success';

  useEffect(() => {
    onDisabledChange?.(isDisabled);
  }, [isDisabled, onDisabledChange]);

  const handleClickValidate = useCallback(() => {
    setHasValidated(true);
    setValidation(validateInstagramUrl(value));
  }, [value]);

  // UX: 값 바꾸면 이전 검증 결과는 무효니까 숨김 처리(선택)
  const handleChange = (next: string) => {
    if (isDisabled) return;
    onChange(next);
    setHasValidated(false);
    setValidation({ state: 'default' });
  };

  const handleClickEdit = useCallback(() => {
    // 잠금 해제 + 포커스
    setHasValidated(false);
    setValidation({ state: 'default' });

    // 다음 tick에 focus
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  const inputState = useMemo(() => {
    if (!hasValidated) return 'default' as const;
    return validation.state;
  }, [hasValidated, validation.state]);

  const message = useMemo(() => {
    if (!hasValidated) return undefined;
    return validation.message;
  }, [hasValidated, validation]);

  return (
    <div className={cn('flex gap-3 items-center', className)}>
      <BoxInput
        className={cn('flex-1')}
        boxClassName={cn(isDisabled && 'bg-neutral-30 text-neutral-40 border-neutral-40')}
        state={inputState}
        message={message}
      >
        <input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="https://www.instagram.com/username"
          disabled={isDisabled}
        />
      </BoxInput>

      {isDisabled ? (
        <Button
          type="button"
          onClick={handleClickEdit}
          className="w-18.5 h-12 rounded-xl px-0 bg-primary-50 text-white body-14-semibold disabled:bg-neutral-30"
        >
          수정
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleClickValidate}
          disabled={!value.trim()}
          className="w-18.5 h-12 rounded-xl px-0 bg-primary-40 text-white body-14-semibold disabled:bg-neutral-30"
        >
          입력
        </Button>
      )}
    </div>
  );
};
