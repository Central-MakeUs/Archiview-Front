'use client';

import { Modal } from '@/shared/ui/common/Modal/Modal';
import { Button } from '@/shared/ui/button';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { cn } from '@/shared/lib/cn';

interface ICameraPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void | Promise<void>;
}

export const CameraPermissionModal = ({
  isOpen,
  onClose,
  onOpenSettings,
}: ICameraPermissionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-70">
      <div className="relative rounded-default bg-white">
        <div className="flex justify-end h-5">
          <XIcon onClick={onClose} className="right-4 top-4 w-3" />
        </div>

        <h2 className="body-16-bold text-neutral-90">사진 권한이 필요해요</h2>

        <p className="mt-3 body-14-medium text-neutral-40">
          사진 업로드를 위해 카메라/사진 접근 권한이 필요해요.
          <br />
          설정에서 권한을 허용한 뒤 다시 시도해 주세요.
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

          <Button
            onClick={() => {
              void onOpenSettings();
            }}
            className={cn('flex-1 h-9 body-14-medium px-0')}
          >
            설정으로 이동
          </Button>
        </div>
      </div>
    </Modal>
  );
};
