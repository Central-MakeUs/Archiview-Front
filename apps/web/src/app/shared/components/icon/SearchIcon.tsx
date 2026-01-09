import * as React from 'react';

export type SearchIconProps = React.SVGProps<SVGSVGElement>;

export const SearchIcon = ({
  width = 19,
  height = 19,
  ...props
}: SearchIconProps): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.43904 0C3.33057 0 0 3.33058 0 7.43905C0 11.5475 3.33057 14.8781 7.43904 14.8781C9.18797 14.8781 10.7959 14.2746 12.066 13.2644L16.7273 17.9256C17.0582 18.2566 17.5948 18.2566 17.9258 17.9256C18.2567 17.5947 18.2567 17.0581 17.9258 16.7271L13.2645 12.0658C14.2746 10.7958 14.8781 9.18789 14.8781 7.43905C14.8781 3.33058 11.5475 0 7.43904 0ZM1.69497 7.43905C1.69497 4.26668 4.26668 1.69497 7.43904 1.69497C10.6114 1.69497 13.1831 4.26668 13.1831 7.43905C13.1831 10.6114 10.6114 13.1831 7.43904 13.1831C4.26668 13.1831 1.69497 10.6114 1.69497 7.43905Z"
        fill="currentColor"
      />
    </svg>
  );
};
