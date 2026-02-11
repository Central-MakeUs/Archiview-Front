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
  boxClassName?: string;
  onClick?: () => void;
  /** disabled 시 bg-neutral-20, border-neutral-30 적용 */
  disabledStyle?: boolean;
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

export const BoxInput = ({
  state,
  message,
  rightSlot,
  children,
  className,
  boxClassName,
  onClick,
  disabledStyle,
}: IBoxInputProps) => {
  return (
    <Input state={state} message={message}>
      {({ visualState, shouldShowMessage, bind }) => (
        <div className={cn('relative flex flex-col gap-1 w-full', className)}>
          <div
            onClick={onClick}
            className={cn(
              'flex items-center h-12 gap-3 rounded-xl border px-4 caret-primary-40',
              disabledStyle ? 'bg-neutral-20 border-neutral-30' : boxBorderByState[visualState],
              boxClassName,
            )}
          >
            <div className="flex-1">
              {cloneElement(children, {
                ...bind,
                className: cn(
                  'w-full bg-transparent outline-none body-14-medium',
                  children.props.className,
                ),
              })}
            </div>
            {rightSlot}
          </div>

          {shouldShowMessage && (
            <p
              className={cn(
                'absolute left-0 -bottom-5 caption-12-regular',
                messageByState[visualState],
              )}
            >
              {message}
            </p>
          )}
        </div>
      )}
    </Input>
  );
};
