import { cn } from '@/shared/lib/cn';
import { BoxInput } from '@/shared/ui/common/Input/BoxInput';

interface IIntroductionInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const IntroductionInput = ({ value, onChange, className }: IIntroductionInputProps) => {
  return (
    <div className={cn('flex gap-3 items-center', className)}>
      <BoxInput className="flex-1" state="default">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="한줄로 당신을 소개해주세요. (50자 이내)"
        />
      </BoxInput>
    </div>
  );
};
