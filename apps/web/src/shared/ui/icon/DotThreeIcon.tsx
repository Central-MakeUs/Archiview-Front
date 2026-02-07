'use client';

import * as React from 'react';

import { BottomSheetModal } from '../common/BottomSheet/BottomSheetModal';

type IconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

export function DotThreeIcon({ title, ...props }: IconProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="p-2"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role={title ? 'img' : 'presentation'}
          aria-label={title}
          aria-hidden={title ? undefined : true}
          {...props}
        >
          {title ? <title>{title}</title> : null}

          <path
            d="M11.9961 12H12.0051"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.9998 12H18.0088"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.99981 12H6.00879"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <BottomSheetModal open={open} onOpenChange={setOpen} height={360} className="z-100">
        <div className="p-4">
          ㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁ
          ㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁ
        </div>
      </BottomSheetModal>
    </>
  );
}
