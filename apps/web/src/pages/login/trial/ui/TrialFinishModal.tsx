import { useRouter } from 'next/navigation';

import { BottomSheetModal } from '@/shared/ui/common/BottomSheet';
import { XIcon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';

interface ITrialFinishModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const TrialFinishModal = ({ open, setOpen }: ITrialFinishModalProps) => {
  const router = useRouter();

  return (
    <>
      <BottomSheetModal open={open} onOpenChange={setOpen} height={360} className="z-100">
        <div className="flex flex-col p-5 text-center justify-between h-full py-8">
          <div>
            <div className="flex justify-end">
              <XIcon onClick={() => setOpen(false)} className="w-6" />
            </div>
            <p className="heading-20-semibold">
              아카이브를 시작하려면
              <br /> 로그인이 필요해요
            </p>
            <p className="body-14-medium text-neutral-40 mt-5">
              아카이브 기능은 로그인 후 이용할 수 있어요. <br />
              로그인하고 장소를 저장해보세요.
            </p>
          </div>
          <div>
            <Button onClick={() => setOpen(false)} className="w-full">
              로그인하기
            </Button>
            <p className="text-center caption-12-semibold text-neutral-50 mt-2">
              이미 가입했나요?{' '}
              <button onClick={() => router.back} className="underline underline-offset-2">
                로그인
              </button>
            </p>
          </div>
        </div>
      </BottomSheetModal>
    </>
  );
};
