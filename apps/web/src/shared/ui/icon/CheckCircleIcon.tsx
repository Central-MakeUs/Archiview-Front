import type { SVGProps } from 'react';

export const CheckCircleIcon = (props: SVGProps<SVGSVGElement>): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-3.6991e-05 6C-3.6991e-05 2.68629 2.68625 0 5.99996 0C9.31367 0 12 2.68629 12 6C12 9.31371 9.31367 12 5.99996 12C2.68625 12 -3.6991e-05 9.31371 -3.6991e-05 6ZM8.81615 4.71263C9.02566 4.49617 9.02003 4.15086 8.80358 3.94134C8.58712 3.73183 8.2418 3.73746 8.03229 3.95392L5.19837 6.88178L3.96818 5.60734C3.75896 5.3906 3.41366 5.3845 3.19691 5.59372C2.98017 5.80294 2.97407 6.14825 3.18329 6.36499L4.80539 8.04543C4.90809 8.15182 5.04959 8.21196 5.19747 8.21206C5.34534 8.21216 5.48692 8.15222 5.58977 8.04596L8.81615 4.71263Z"
        fill="currentColor"
      />
    </svg>
  );
};
