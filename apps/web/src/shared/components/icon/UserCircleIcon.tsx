import type { SVGProps } from 'react';

export const UserCircleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={32}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 16C22 10.4772 17.5228 6 12 6C6.47715 6 2 10.4772 2 16C2 21.5228 6.47715 26 12 26C17.5228 26 22 21.5228 22 16Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 21C17 18.2386 14.7614 16 12 16C9.23858 16 7 18.2386 7 21"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
