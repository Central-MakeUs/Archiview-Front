import { cn } from '@/shared/lib/cn';
import { Modal } from '@/shared/ui/common/Modal/Modal';

interface IReportModalProps {
  isOpen: boolean;
  editorName?: string;
  onCancel: () => void;
  onConfirm: () => void;
  className?: string;
}

export const ReportModal = ({ isOpen, onCancel, onConfirm, className }: IReportModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      closeOnOverlayClick
      className={cn(
        // 사진처럼 둥글고, 폭 고정 + 가운데 정렬
        'w-[320px] rounded-2xl px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)]',
        className,
      )}
    >
      <div className="text-center">
        <h2 className="text-[16px] font-semibold text-neutral-900">
          이 게시글 / 에디터를 신고할까요?
        </h2>

        <p className="mt-2 whitespace-pre-line text-[13px] leading-5 text-neutral-500">
          신고하기를 클릭하여\n신고 사유를 작성해주세요.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              'h-10 rounded-xl bg-neutral-100 text-[14px] font-medium text-neutral-500',
              'hover:bg-neutral-200 active:bg-neutral-200',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            취소
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              'h-10 rounded-xl bg-blue-500 text-[14px] font-semibold text-white',
              'hover:brightness-95 active:brightness-90',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            신고하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const BlockModal = ({
  isOpen,
  onCancel,
  onConfirm,
  editorName,
  className,
}: IReportModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      closeOnOverlayClick
      className={cn(
        // 사진처럼 둥글고, 폭 고정 + 가운데 정렬
        'w-[320px] rounded-2xl px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)]',
        className,
      )}
    >
      <div className="text-center">
        <h2 className="text-[16px] font-semibold text-neutral-900">
          <span className="text-primary-40">{editorName}</span>
          <br /> 이 게시글 / 에디터를 신고할까요?
        </h2>

        <p className="mt-2 whitespace-pre-line text-[13px] leading-5 text-neutral-500">
          차단하면 더 이상 해당 에디터가
          <br />
          아카이뷰에서 표시되지 않아요.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              'h-10 rounded-xl bg-neutral-100 text-[14px] font-medium text-neutral-500',
              'hover:bg-neutral-200 active:bg-neutral-200',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            취소
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              'h-10 rounded-xl bg-blue-500 text-[14px] font-semibold text-white',
              'hover:brightness-95 active:brightness-90',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            차단하기
          </button>
        </div>
      </div>
    </Modal>
  );
};
