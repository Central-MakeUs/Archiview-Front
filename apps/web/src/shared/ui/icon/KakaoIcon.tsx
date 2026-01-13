import type { SVGProps } from 'react';

export const KakaoIcon = (props: SVGProps<SVGSVGElement>): React.ReactElement => {
  return (
    <svg
      width={26}
      height={24}
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.902"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 0C6.19667 0 0 5.38006 0 9.93166C0 13.3422 2.25044 16.3505 5.67811 18.1382L4.23656 23.3477C4.108 23.8096 4.641 24.1762 5.04978 23.9104L11.3721 19.7823C11.9051 19.8335 12.4482 19.8633 13 19.8633C20.1789 19.8633 26 15.4169 26 9.93166C26 5.38006 20.1789 0 13 0Z"
        fill="black"
      />
    </svg>
  );
};
