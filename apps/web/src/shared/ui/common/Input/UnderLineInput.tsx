import { cloneElement, type InputHTMLAttributes, type ReactElement } from 'react';
import { cn } from '@/shared/lib/cn';
import { Input, type InputState, type VisualState } from './Input';

type FocusableInputElement = ReactElement<InputHTMLAttributes<HTMLInputElement>>;

interface IBaseInputProps {
  state?: InputState;
  message?: string;
  rightSlot?: React.ReactNode;
  children: FocusableInputElement;
  className?: string;
}

const underlineByState: Record<VisualState, string> = {
  default: 'border-neutral-30',
  error: 'border-error-40',
  success: 'border-primary-40',
  focus: 'border-primary-40',
};

const messageByState: Record<VisualState, string> = {
  default: 'text-neutral-90',
  error: 'text-error-40',
  success: 'text-primary-40',
  focus: 'text-primary-40',
};

export const UnderLineInput = ({
  state = 'default',
  message,
  rightSlot,
  children,
  className,
}: IBaseInputProps) => {
  return (
    <Input state={state} message={message}>
      {({ visualState, shouldShowMessage, bind }) => (
        <div className={cn('flex flex-col gap-1 w-full', className)}>
          <div
            className={cn(
              'flex h-10 items-end gap-1 border-b-[1.2px] pb-2 caret-primary-40',
              underlineByState[visualState],
            )}
          >
            <div className="flex-1 body-14-medium">{cloneElement(children, bind)}</div>
            {rightSlot}
          </div>

          {shouldShowMessage && (
            <p className={cn('caption-12-regular', messageByState[visualState])}>{message}</p>
          )}
        </div>
      )}
    </Input>
  );
};
