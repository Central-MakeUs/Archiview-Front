import * as React from 'react';
type BlueFolderIconProps = React.SVGProps<SVGSVGElement>;
export const BlueFolderIcon = ({
  width = 30,
  height = 30,
  ...props
}: BlueFolderIconProps): React.ReactNode => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      {' '}
      <rect width="30" height="30" rx="7" fill="white" />{' '}
      <path
        d="M21.8918 10.3641L12.9255 6.69225C11.641 6.1662 10.1732 6.78109 9.64711 8.06565L7.30506 13.7847C6.779 15.0693 7.3939 16.537 8.67846 17.0631L17.6448 20.735C18.9293 21.261 20.3971 20.6461 20.9232 19.3616L23.2652 13.6425C23.7913 12.358 23.1764 10.8902 21.8918 10.3641Z"
        fill="url(#paint0_linear_369_7571)"
      />{' '}
      <path
        d="M21.1703 14.0513H18.615H18.0806C16.8134 14.0513 15.9612 13.8265 15.9268 12.6012V12.4048C15.9268 10.8427 14.6602 9.57617 13.0981 9.57617H8.62551C7.06342 9.57617 5.79688 10.8427 5.79688 12.4054V21.3137C5.79688 22.8758 7.06342 24.1423 8.62551 24.1423H21.1703C22.7324 24.1423 23.9989 22.8758 23.9989 21.3137V16.8805C23.9989 15.3184 22.7324 14.0519 21.1703 14.0519V14.0513Z"
        fill="#359EFA"
      />{' '}
      <defs>
        {' '}
        <linearGradient
          id="paint0_linear_369_7571"
          x1="17.4087"
          y1="8.52818"
          x2="13.1616"
          y2="18.899"
          gradientUnits="userSpaceOnUse"
        >
          {' '}
          <stop /> <stop offset="0.307692" stopColor="#365168" />{' '}
          <stop offset="0.629808" stopColor="#84C6FF" />{' '}
        </linearGradient>{' '}
      </defs>{' '}
    </svg>
  );
};
