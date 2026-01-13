import type { SVGProps } from 'react';

export const HomeIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="M12.8924 6.80982L21.4876 13.5955C21.8112 13.8509 22 14.2405 22 14.6528C22 15.3969 21.3969 16 20.6528 16H20V19.5C20 22.3284 20 23.7426 19.1213 24.6213C18.2426 25.5 16.8284 25.5 14 25.5H10C7.17157 25.5 5.75736 25.5 4.87868 24.6213C4 23.7426 4 22.3284 4 19.5V16H3.34716C2.60315 16 2 15.3969 2 14.6528C2 14.2405 2.1888 13.8509 2.5124 13.5955L11.1076 6.80982C11.3617 6.60915 11.6761 6.5 12 6.5C12.3239 6.5 12.6383 6.60915 12.8924 6.80982Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 25.5V21C14.5 20.0654 14.5 19.5981 14.299 19.25C14.1674 19.022 13.978 18.8326 13.75 18.701C13.4019 18.5 12.9346 18.5 12 18.5C11.0654 18.5 10.5981 18.5 10.25 18.701C10.022 18.8326 9.83261 19.022 9.70096 19.25C9.5 19.5981 9.5 20.0654 9.5 21V25.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
