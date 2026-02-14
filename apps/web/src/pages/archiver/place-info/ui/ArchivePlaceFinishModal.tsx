'use client';

import { Modal } from '@/shared/ui/common/Modal/Modal';
import { Button } from '@/shared/ui/button';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { cn } from '@/shared/lib/cn';

interface IArchivePlaceFinishModalProps {
  editor: string;
  place: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type?: 'archive' | 'unarchive';
}

export const ArchivePlaceFinishModal = ({
  isOpen,
  place,
  editor,
  onClose,
  onConfirm,
  type = 'archive',
}: IArchivePlaceFinishModalProps) => {
  const isUnarchive = type === 'unarchive';

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-70">
      <div className="relative rounded-default bg-white text-center">
        <div className="flex justify-end h-5">
          <XIcon onClick={onClose} className="right-4 top-4 w-3" />
        </div>

        <h2 className="body-16-bold text-neutral-90 pb-5">
          {isUnarchive ? '아카이브 취소' : '아카이브 완료!'}
        </h2>
        <span className="body-14-bold text-primary-40">{place}</span>
        <p className="mt-3 body-14-bold text-neutral-40">
          <span className="text-primary-40">{editor} 에디터님의 글</span>을
          <br /> {isUnarchive ? '아카이브를 취소했어요' : '아카이브 했어요'}
        </p>

        <div className="mt-6 flex gap-2">
          <Button onClick={onConfirm} className={cn('flex-1 h-9 body-14-medium px-0')}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};
