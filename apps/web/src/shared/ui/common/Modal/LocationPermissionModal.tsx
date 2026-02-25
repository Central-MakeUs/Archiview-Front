'use client';

import { Modal } from '@/shared/ui/common/Modal/Modal';
import { Button } from '@/shared/ui/button';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { cn } from '@/shared/lib/cn';

interface ILocationPermissionModalProps {
  isOpen: boolean;
  isWebView: boolean;
  onClose: () => void;
  onOpenSettings: () => void | Promise<void>;
}

export const LocationPermissionModal = ({
  isOpen,
  isWebView,
  onClose,
  onOpenSettings,
}: ILocationPermissionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-70">
      <div className="relative rounded-default bg-white">
        <div className="flex justify-end h-5">
          <XIcon onClick={onClose} className="right-4 top-4 w-3" />
        </div>

        <h2 className="body-16-bold text-neutral-90">위치 권한이 필요해요</h2>

        <p className="mt-3 body-14-medium text-neutral-40">
          내주변 장소를 보려면 위치 권한이 필요해요.
          <br />
          {isWebView
            ? '설정에서 위치 권한을 허용한 뒤 다시 시도해 주세요.'
            : '브라우저 설정에서 위치 권한을 허용한 뒤 다시 시도해 주세요.'}
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
              Promise.resolve(onOpenSettings()).catch(() => undefined);
            }}
            disabled={!isWebView}
            className={cn('flex-1 h-9 body-14-medium px-0')}
          >
            설정으로 이동
          </Button>
        </div>
      </div>
    </Modal>
  );
};
