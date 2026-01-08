import type { SVGProps } from 'react';

export const FolderIcon = (props: SVGProps<SVGSVGElement>): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={12}
      viewBox="0 0 16 12"
      fill="none"
      {...props}
    >
      <path
        d="M13.3526 3.6477H11.1332H10.669C9.56841 3.6477 8.82826 3.46452 8.79831 2.46576V2.30566C8.79831 1.03238 7.69826 0 6.3415 0H2.45681C1.10006 0 0 1.03238 0 2.30616V9.56744C0 10.8407 1.10006 11.8731 2.45681 11.8731H13.3526C14.7093 11.8731 15.8094 10.8407 15.8094 9.56744V5.95387C15.8094 4.68058 14.7093 3.64821 13.3526 3.64821V3.6477Z"
        fill="currentColor"
      />
    </svg>
  );
};
