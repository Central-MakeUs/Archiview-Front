import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface IChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary';
  chipType?: 'category' | 'keyword';
  selected?: boolean;
  label: string;
  endIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

/**
 * Chip Component Props
 * @param variant 칩의 variant (contained, outlined)
 * @param chipType 칩의 타입 (category, keyword)
 * @param color 칩의 색상 테마 (primary, secondary, default)
 * @param hashTag label 앞에 # 표시 여부 (default false)
 * @param label 칩에 표시될 텍스트
 * @param endIcon 칩 우측에 표시될 아이콘
 * @param disabled default false
 * @param className 외부에서 전달받는 className (오버라이드 용도)
 * @param props 기본 button attribute
 */
export const Chip = ({
  variant = 'default',
  chipType = 'category',
  selected = false,
  label,
  endIcon,
  className,
  disabled,
  ...props
}: IChipProps): ReactElement => {
  // 공통 스타일
  const baseStyles = `
    inline-flex
    items-center
    gap-[8px]
    px-[12px]
    body-14-semibold
    rounded-[999px]
    cursor-pointer
    focus:outline-none
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  // chipType 스타일
  const chipTypeStyle = chipType === 'keyword' ? 'bg-neutral-10 h-[36px]' : 'h-[26px]';

  const selectedStyle = selected ? 'border border-primary-40 text-primary-40' : null;

  const variantStyle =
    variant === 'default'
      ? 'border border-neutral-40 text-neutral-40'
      : 'border border-secondary-40 text-secondary-40';

  return (
    <button
      type="button"
      disabled={disabled}
      className={twMerge(clsx(baseStyles, chipTypeStyle, variantStyle, selectedStyle), className)}
      {...props}
    >
      {label}
      {endIcon && <span className="inline-flex">{endIcon}</span>}
    </button>
  );
};
