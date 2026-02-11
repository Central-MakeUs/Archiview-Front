import { useCallback, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { Button } from '@/shared/ui/button';

interface IInstagramIdInputProps {
  value: string;
  onChange: (value: string) => void;
  disabledCheck?: boolean;
  className?: string;
}

interface IValidation {
  state: 'default' | 'success' | 'error';
  message?: string;
}

export const InstagramIdInput = ({ value, onChange, className }: IInstagramIdInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [validation, setValidation] = useState<IValidation>({ state: 'default' });
  const [hasValidated, setHasValidated] = useState(false);

  const isLocked = hasValidated && validation.state === 'success';

  const handleChange = (next: string) => {
    if (isLocked) return;

    onChange(next);

    // 입력이 바뀌면 기존 검증 결과 무효
    setHasValidated(false);
    setValidation({ state: 'default' });
  };

  const handleClickValidate = useCallback(async () => {
    // ✅ TODO : 인스타그램 아이디 검증(중복확인) API 연동
    // 예) const res = await validateInstagramId(value)
    // if (res.ok) success else error

    setHasValidated(true);

    // 임시 로직: 값 있으면 success, 없으면 error
    if (!value.trim()) {
      setValidation({ state: 'error', message: '인스타그램 아이디를 입력해주세요.' });
      return;
    }

    setValidation({ state: 'success', message: '인스타그램 아이디가 정상적으로 인식됐어요.' });
  }, [value]);

  const handleClickEdit = useCallback(() => {
    setHasValidated(false);
    setValidation({ state: 'default' });

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  return (
    <div className={cn('flex gap-3 items-center', className)}>
      <BoxInput
        className="flex-1"
        state={hasValidated ? validation.state : 'default'}
        message={hasValidated ? validation.message : undefined}
        boxClassName={cn(isLocked && 'bg-neutral-30 text-neutral-40 border-neutral-40')}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="@Instagram ID"
          disabled={isLocked}
        />
      </BoxInput>

      {isLocked ? (
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
