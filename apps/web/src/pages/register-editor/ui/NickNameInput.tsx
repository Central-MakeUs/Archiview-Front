import { useCallback, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { Button } from '@/shared/ui/button';

interface INickNameInputProps {
  value: string;
  onChange: (value: string) => void;
  disabledCheck?: boolean;
  className?: string;
}

interface IValidation {
  state: 'default' | 'success' | 'error';
  message?: string;
}

export const NickNameInput = ({
  value,
  onChange,
  disabledCheck,
  className,
}: INickNameInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [validation, setValidation] = useState<IValidation>({ state: 'default' });
  const [hasValidated, setHasValidated] = useState(false);

  const isLocked = hasValidated && validation.state === 'success';

  const handleChange = (next: string) => {
    if (isLocked) return;

    onChange(next);

    // 입력 바뀌면 기존 중복확인 결과 무효
    setHasValidated(false);
    setValidation({ state: 'default' });
  };

  const handleClickCheck = useCallback(async () => {
    // ✅ TODO : 닉네임 중복확인 api 연동
    // const res = await checkNicknameDuplicate(value)
    // if (res.ok) { ...success... } else { ...error... }

    setHasValidated(true);

    // 임시 로직: 값 있으면 성공, 없으면 에러
    if (!value.trim()) {
      setValidation({ state: 'error', message: '닉네임을 입력해주세요.' });
      return;
    }

    setValidation({ state: 'success', message: '사용 가능한 닉네임이에요.' });
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
          placeholder="프로필 닉네임을 입력해주세요 (6자 이내)"
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
          onClick={handleClickCheck}
          disabled={disabledCheck}
          className="w-18.5 h-12 rounded-xl px-0 bg-primary-40 text-white body-14-semibold disabled:bg-neutral-30"
        >
          중복확인
        </Button>
      )}
    </div>
  );
};
