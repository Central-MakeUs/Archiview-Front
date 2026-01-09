import type { SVGProps } from 'react';

export const PencilIcon = (props: SVGProps<SVGSVGElement>): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3244 3.18448C14.2885 2.22041 15.8516 2.22041 16.8157 3.18448C17.7797 4.14855 17.7797 5.71162 16.8156 6.67569L6.29486 17.1965C6.15421 17.3372 5.96344 17.4162 5.76453 17.4162H3.33398C2.91977 17.4162 2.58398 17.0804 2.58398 16.6662V14.2356C2.58398 14.0367 2.663 13.846 2.80365 13.7053L13.3244 3.18448ZM15.755 4.24514C15.3767 3.86685 14.7634 3.86685 14.3851 4.24514L4.08398 14.5463V15.9162H5.45387L15.755 5.61504C16.1333 5.23675 16.1333 4.62343 15.755 4.24514Z"
        fill="currentColor"
      />
    </svg>
  );
};
