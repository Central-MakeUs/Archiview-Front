'use client';

import Image from 'next/image';
import { Button } from '../../button';
import { useRouter } from 'next/navigation';

export interface IErrorProps {
  title?: string;
  description?: string;
}

export const Error = ({
  title = '일시적인 오류가 생겼어요',
  description = '아카이뷰 팀은 문제를 해결하기 위해\n열심히 노력하고 있어요.',
}: IErrorProps) => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full items-center justify-center p-20">
      <div className="flex w-full flex-col items-center gap-14 rounded-[20px] bg-neutral-10 px-5 py-9">
        <Image src="/images/ErrorPageImage.svg" alt="" width={100} height={117} />
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-1">
            <p className="heading-20-semibold text-center text-neutral-90 mb-5">{title}</p>
            <p className="body-16-semibold text-center text-neutral-40 whitespace-pre-line">
              {description}
            </p>
          </div>
          <Button variant="contained" onClick={() => router.push('/')} className="w-42">
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
};
