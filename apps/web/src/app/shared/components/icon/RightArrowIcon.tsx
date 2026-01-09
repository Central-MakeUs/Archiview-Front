import type { SVGProps } from 'react';

export const RightArrowIcon = (props: SVGProps<SVGSVGElement>): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={8}
      height={14}
      viewBox="0 0 8 14"
      fill="none"
      {...props}
    >
      <path
        d="M0.750047 0.75C0.750047 0.75 6.74999 5.16893 6.75 6.75005C6.75001 8.33116 0.75 12.75 0.75 12.75"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
