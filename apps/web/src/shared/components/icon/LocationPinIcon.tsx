import type { SVGProps } from 'react';

export const LocationPinIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="M13.6177 25.367C13.1841 25.773 12.6044 26 12.0011 26C11.3978 26 10.8182 25.773 10.3845 25.367C6.41302 21.626 1.09076 17.4469 3.68627 11.3797C5.08963 8.09916 8.45834 6 12.0011 6C15.5439 6 18.9126 8.09916 20.316 11.3797C22.9082 17.4393 17.599 21.6389 13.6177 25.367Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M15.5 15C15.5 16.933 13.933 18.5 12 18.5C10.067 18.5 8.5 16.933 8.5 15C8.5 13.067 10.067 11.5 12 11.5C13.933 11.5 15.5 13.067 15.5 15Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  );
};
