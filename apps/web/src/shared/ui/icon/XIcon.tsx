import type { SVGProps } from 'react';

export const XIcon = (props: SVGProps<SVGSVGElement>): React.ReactElement => {
  return (
    <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.75 0.75L0.750608 9.74936M9.74939 9.75L0.75 0.750636"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
