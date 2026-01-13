import { cloneElement, type InputHTMLAttributes, type ReactElement } from 'react';
import { cn } from '@/shared/lib/cn';
import { Input, type InputState, type VisualState } from './Input';

type FocusableInputElement = ReactElement<InputHTMLAttributes<HTMLInputElement>>;

interface IBoxInputProps {
  state?: InputState;
  message?: string;
  rightSlot?: React.ReactNode;
  children: FocusableInputElement;
  className?: string;
}

const boxBorderByState: Record<VisualState, string> = {
  default: 'border-neutral-30',
  focus: 'border-primary-40',
  error: 'border-error-40',
  success: 'border-primary-40',
};

const messageByState: Record<VisualState, string> = {
  default: 'text-neutral-90',
  focus: 'text-primary-40',
  error: 'text-error-40',
  success: 'text-primary-40',
};

export const BoxInput = ({ state, message, rightSlot, children, className }: IBoxInputProps) => {
  return (
    <Input state={state} message={message}>
      {({ visualState, shouldShowMessage, bind }) => (
        <div className={cn('flex flex-col gap-1 w-full', className)}>
          <div
            className={cn(
              'flex items-center h-14 gap-3 rounded-xl border px-4 caret-primary-40',
              boxBorderByState[visualState],
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
