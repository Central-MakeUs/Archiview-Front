import { CheckBoxIcon, RightArrowIcon } from '@/shared/ui/icon';
import { cn } from '@/shared/lib/cn';

interface ICheckItem {
  children: React.ReactNode;
  className?: string;
  checked: boolean;
  endArrowIcon?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const CheckItem = ({
  children,
  className,
  checked,
  onCheckedChange,
  endArrowIcon = true,
}: ICheckItem) => {
  return (
    <div
      className={cn('flex flex-row py-4 px-5 items-center justify-between rounded-xl', className)}
    >
      <div className="flex flex-row">
        <CheckBoxIcon
          onClick={() => onCheckedChange(!checked)}
          className={cn('mr-3', checked ? 'text-primary-40' : 'text-neutral-40')}
        />
        {children}
      </div>
      {endArrowIcon && <RightArrowIcon className="text-neutral-70" />}
    </div>
  );
};
