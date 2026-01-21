'use client';

import { Modal } from '@/shared/ui/common/Modal/Modal';
import { Button } from '@/shared/ui/button';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { cn } from '@/shared/lib/cn';

interface IFollowDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const FollowDeleteModal = ({ isOpen, onClose, onConfirm }: IFollowDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-70">
      <div className="relative rounded-default bg-white">
        <div className="flex justify-end h-5">
          <XIcon onClick={onClose} className="right-4 top-4 w-3" />
        </div>

        <h2 className="body-16-bold text-neutral-90">이 에디터 팔로우를 해제할까요?</h2>

        <p className="mt-3 body-14-medium text-neutral-40">
          더 이상 이 에디터의 장소 기록이 추천과
          <br /> 피드에 표시되지 않아요.
        </p>

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
            팔로우 해제
          </Button>
        </div>
      </div>
    </Modal>
  );
};
