import type { SVGProps } from 'react';

const clipPathId = 'clip0_CaretUpCircleIcon';

export const CaretUpCircleIcon = (props: SVGProps<SVGSVGElement>): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#${clipPathId})`}>
        <circle
          cx="9.99935"
          cy="9.99984"
          r="8.33333"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          d="M13.3327 11.25C13.3327 11.25 10.8777 8.75001 9.99932 8.75C9.12093 8.74999 6.66602 11.25 6.66602 11.25"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width={20} height={20} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
