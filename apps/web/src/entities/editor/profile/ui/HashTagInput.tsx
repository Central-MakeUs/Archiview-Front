import { useCallback, useMemo, useState } from 'react';

import { cn } from '@/shared/lib/cn';
import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { Button } from '@/shared/ui/button';
import { XIcon } from '@/shared/ui/icon';

interface IHashTagChipProps {
  label: string;
  onRemove: () => void;
  className?: string;
}

export const HashTagChip = ({ label, onRemove, className }: IHashTagChipProps) => {
  return (
    <button
      type="button"
      onClick={onRemove}
      className={cn(
        'inline-flex items-center gap-3 rounded-2xl bg-neutral-10 px-5 py-3',
        'text-neutral-50 body-16-semibold',
        className,
      )}
    >
      <span className="truncate">#{label}</span>
      <span className="text-neutral-40 text-xl leading-none">×</span>
    </button>
  );
};

interface IHashTagInputRowProps {
  placeholder?: string;
  onAdd: (tag: string) => void;
  disabledAdd?: boolean;
  className?: string;
}

export const HashTagInputRow = ({
  placeholder = '게시물을 나타내는 키워드를 입력해주세요.',
  onAdd,
  disabledAdd,
  className,
}: IHashTagInputRowProps) => {
  const [value, setValue] = useState('');

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue('');
  };

  return (
    <div className={cn('flex gap-3 items-center', className)}>
      <BoxInput className="flex-1" state="default">
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
      </BoxInput>

      <button
        type="button"
        onClick={submit}
        disabled={disabledAdd}
        className="h-14 w-24 rounded-2xl bg-primary-40 text-white body-16-semibold disabled:bg-neutral-30"
      >
        추가
      </button>
    </div>
  );
};

interface IHashTagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
  className?: string;
}

const normalizeTag = (raw: string) => {
  const t = raw.trim();
  if (!t) return null;

  const noHash = t.startsWith('#') ? t.slice(1).trim() : t;
  if (!noHash) return null;

  return `#${noHash}`;
};

export const HashTagInput = ({ value, onChange, max = 2, className }: IHashTagInputProps) => {
  const [input, setInput] = useState('');

  const canAdd = useMemo(() => value.length < max, [value.length, max]);

  const addTag = useCallback(() => {
    const tag = normalizeTag(input);
    if (!tag) return;

    // 정책 예시: 5자 이내
    if (tag.length > 5) return;

    if (value.includes(tag)) {
      setInput(''); // 중복이면 그냥 비우든지, 메시지 띄우든지
      return;
    }

    if (!canAdd) return;

    onChange([...value, tag]);
    setInput('');
  }, [input, value, onChange, canAdd]);

  const removeTag = useCallback(
    (tag: string) => {
      onChange(value.filter((t) => t !== tag));
    },
    [value, onChange],
  );

  return (
    <div className={cn(className)}>
      {/* 상단 입력줄 */}
      <div className="flex gap-3 items-center">
        <BoxInput className="flex-1" state="default">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="키워드를 입력해주세요. (5자 이내)"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
          />
        </BoxInput>

        <Button
          onClick={addTag}
          disabled={!canAdd || !input.trim()}
          className="w-18.5 h-12 rounded-xl px-0 bg-primary-40 text-white body-14-semibold disabled:bg-neutral-30"
        >
          입력
        </Button>
      </div>

      {/* 하단 칩 */}
      <div className="mt-4 flex flex-wrap gap-3">
        {value.map((tag) => (
          <div
            key={tag}
            className="inline-flex items-center gap-4 rounded-default bg-neutral-10 px-3 h-9"
          >
            <span className="body-14-semibold text-neutral-40">{tag}</span>
            <button type="button" onClick={() => removeTag(tag)} aria-label="해시태그 삭제">
              <XIcon className="w-2.5 text-neutral-40" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
