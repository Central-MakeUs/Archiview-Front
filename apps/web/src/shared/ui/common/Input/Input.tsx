import { useState } from 'react';

export type InputState = 'default' | 'error' | 'success';
export type VisualState = InputState | 'focus';

interface IInputProps {
  state?: InputState;
  message?: string;
  children: (args: {
    visualState: VisualState;
    shouldShowMessage: boolean;
    bind: {
      onFocus: () => void;
      onBlur: () => void;
    };
  }) => React.ReactNode;
}

/**
 * Input 헤드리스 컴포넌트
 * 상태 우선순위: error , success > focus > default
 */
export const Input = ({ state = 'default', message, children }: IInputProps) => {
  const [focused, setFocused] = useState(false);

  const visualState: VisualState = state === 'default' ? (focused ? 'focus' : 'default') : state;

  const shouldShowMessage = visualState !== 'default' && Boolean(message);

  return (
    <>
      {children({
        visualState,
        shouldShowMessage,
        bind: {
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
        },
      })}
    </>
  );
};
