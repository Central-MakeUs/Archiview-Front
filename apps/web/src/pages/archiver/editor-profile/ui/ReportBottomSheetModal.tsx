import { BottomSheetModal } from '@/shared/ui/common/BottomSheet';
import { XIcon, RightArrowIcon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';

interface IReportBottomSheetModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setReportModalOpen: (open: boolean) => void;
}

export const ReportBottomSheetModal = ({
  open,
  setOpen,
  setReportModalOpen,
}: IReportBottomSheetModalProps) => {
  return (
    <>
      <BottomSheetModal open={open} onOpenChange={setOpen} height={360} className="z-100">
        <div className="p-5 text-left">
          <div className="flex justify-end">
            <XIcon onClick={() => setOpen(false)} className="w-6" />
          </div>
          <p className="heading-20-semibold">신고 / 차단하기</p>
          <p className="body-14-medium text-neutral-40 mt-3">
            규정 위반 게시글 (이미지, 무관한 내용 등)은 신고하기를,
            <br />
            에디터의 게시글을 더 이상 보고 싶지 않다면 차단하기를
            <br />
            선택해주세요.
          </p>
          <div className='flex flex-col'>
            <button
              onClick={() => {
                console.log('Dfdfdf');
                setReportModalOpen(true);
                setOpen(false);
              }}
            >
              <p className="flex flex-row items-center gap-3 body-16-semibold mt-5">
                신고하기 <RightArrowIcon />
              </p>
            </button>
            <button
              onClick={() => {
                setReportModalOpen(true);
                setOpen(false);
              }}
            >
              <p className="flex flex-row items-center gap-3 body-16-semibold mt-3 mb-5">
                차단하기 <RightArrowIcon />
              </p>
            </button>
          </div>
          <Button onClick={() => setOpen(false)} className="w-full">
            닫기
          </Button>
        </div>
      </BottomSheetModal>
    </>
  );
};
