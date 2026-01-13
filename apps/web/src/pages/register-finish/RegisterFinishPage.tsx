import { redirect } from 'next/navigation';

import { Button } from '@/shared/ui/button';

type Role = 'EDITOR' | 'ARCHIVER';

interface IRegisterFinishPageProps {
  searchParams: Promise<{ role?: string }>;
}

export const RegisterFinishPage = async ({ searchParams }: IRegisterFinishPageProps) => {
  const { role } = await searchParams;

  const title = role === 'EDITOR' ? '에디터 프로필' : '아카이버 프로필';

  const description =
    role === 'EDITOR' ? '첫 아카이브를 만들어볼까요?' : '첫 아카이브를 만들어볼까요?';

  const buttonLabel = role === 'EDITOR' ? '에디터 시작하기' : '아카이버 시작하기';

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pt-40 pb-5">
      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-3 items-center">
        <p className="body-16-regular text-neutral-40">모든 준비가 끝났어요!</p>

        <p className="heading-24-semibold text-center">
          <span className="text-primary-40">{title}</span> 이 생성되었어요.
          <br />
          {description}
        </p>
      </div>

      {/* CTA */}
      <Button variant="contained" className="w-full body-16-semibold">
        {buttonLabel}
      </Button>
    </div>
  );
};

export default RegisterFinishPage;
