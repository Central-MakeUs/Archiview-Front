import type { SVGProps } from 'react';

interface IFolderIconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

export const FolderIcon = ({ active = false, ...props }: IFolderIconProps): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      aria-pressed={active}
      {...props}
    >
      <rect width={24} height={24} rx={7} fill="#E3EFFA" />
      <path
        d="M17.2987 9.58006H15.2545H14.827C13.8132 9.58006 13.1315 9.40027 13.1039 8.42004V8.26291C13.1039 7.01324 12.0907 6 10.841 6H7.26291C6.01323 6 5 7.01323 5 8.2634V15.39C5 16.6397 6.01323 17.6529 7.26291 17.6529H17.2987C18.5484 17.6529 19.5616 16.6397 19.5616 15.39V11.8435C19.5616 10.5938 18.5484 9.58056 17.2987 9.58056V9.58006Z"
        fill={active ? '#359EFA' : '#989BA2'}
      />
    </svg>
  );
};
