import React, { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'login';
  startIcon?: React.ReactNode;
  children: React.ReactNode;
  fullwidth?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Button Component Props
 * @author: minjoon park
 * @param variant 버튼의 variant (contained, outlined)
 * @param startIcon 버튼의 startIcon
 * @param children 버튼의 children
 * @param fullwidth deafult false
 * @param disabled default false
 * @param props 기본 button attribute
 *
 */
export const Button = ({
  variant = 'contained',
  children,
  startIcon,
  fullwidth = false,
  disabled = false,
  className,
  ...props
}: IButtonProps): React.ReactNode => {
  // 버튼 기본스타일
  const baseStyles = `inline-flex
    py-[1.2rem]
    px-[2.8rem]
    text-[1.6rem]
    cursor-pointer
    items-center 
    justify-center 
    font-semibold 
    rounded-[1.2rem] 
    focus:outline-none 
    disabled:opacity-50 
    disabled:cursor-not-allowed`;

  // variant 스타일
  const variantStyles = {
    contained: 'bg-primary-40 text-neutral-10 hover:bg-primary-40',
    outlined: 'border border-primary-40 text-primary-40 hover:bg-primary-40 hover:text-neutral-10',
    login: 'text-neutral-70',
  };

  // fullWidth 스타일
  const widthStyles = fullwidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className ?? ''}`}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className="mr-[1.2rem] inline-flex items-center">{startIcon}</span>}
      {children}
    </button>
  );
};
