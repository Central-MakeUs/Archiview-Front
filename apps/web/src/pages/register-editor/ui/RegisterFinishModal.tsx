'use client';

import { Modal } from '@/shared/ui/common/Modal/Modal';
import { Button } from '@/shared/ui/button';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { cn } from '@/shared/lib/cn';

interface IRegisterFinishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RegisterFinishModal = ({ isOpen, onClose, onConfirm }: IRegisterFinishModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-70">
      <div className="relative rounded-default bg-white">
        <div className="flex justify-end h-5">
          <XIcon onClick={onClose} className="right-4 top-4 w-3" />
        </div>

        <h2 className="body-16-bold text-neutral-90">에디터 프로필이 등록되었어요</h2>

        <p className="mt-3 body-14-medium text-neutral-40">에디터 화면으로 이동 해 볼까요?</p>

        <div className="mt-6 flex gap-2">
          <Button
            onClick={onClose}
            className={cn(
              'flex-1 h-9 body-14-medium px-0 bg-white border border-neutral-30 text-neutral-30',
            )}
          >
            취소
          </Button>

          <Button onClick={onConfirm} className={cn('flex-1 h-9 body-14-medium px-0')}>
            등록
          </Button>
        </div>
      </div>
    </Modal>
  );
};
