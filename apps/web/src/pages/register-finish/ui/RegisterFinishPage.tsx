import { Link } from '@/shared/lib/i18n/navigation';

import { Button } from '@/shared/ui/button';
import Image from 'next/image';

type Role = 'EDITOR' | 'ARCHIVER';

interface IRegisterFinishPageProps {
  searchParams: Promise<{ role: Role }>;
}

export const RegisterFinishPage = async ({ searchParams }: IRegisterFinishPageProps) => {
  const { role } = await searchParams;
  const title = role === 'EDITOR' ? '에디터 프로필' : '아카이버 프로필';

  const description =
    role === 'EDITOR' ? '첫 아카이브를 만들어볼까요?' : '첫 아카이브를 만들어볼까요?';

  const buttonLabel = '아카이뷰 시작하기';

  const href = role === 'EDITOR' ? '/editor/home' : '/archiver/home';

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pt-40 pb-5">
      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-3 items-center">
        <p className="body-16-regular text-neutral-40">모든 준비가 끝났어요!</p>

        <p className="heading-24-semibold text-center mb-20">
          <span className="text-primary-40">{title}</span> 이 생성되었어요.
          <br />
          {description}
        </p>
        <Image
          src="/images/FinishOnboardingImage.svg"
          alt="RegisterFinishImage"
          width={166}
          height={195}
        />
      </div>

      {/* CTA */}
      <Link href={href} className="w-full p-4">
        <Button variant="contained" className="w-full body-16-semibold bg-primary-40">
          {buttonLabel}
        </Button>
      </Link>
    </div>
  );
};

export default RegisterFinishPage;
