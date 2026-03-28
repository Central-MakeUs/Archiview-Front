'use client';

import { useTranslations } from 'next-intl';

import { Modal } from '@/shared/ui/common/Modal/Modal';
import { Button } from '@/shared/ui/button';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { cn } from '@/shared/lib/cn';

interface IWithDrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const WithDrawModal = ({ isOpen, onClose, onConfirm }: IWithDrawModalProps) => {
  const t = useTranslations('mypage.withdrawModal');

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-70">
      <div className="relative rounded-default bg-white">
        <div className="flex justify-end h-5">
          <XIcon onClick={onClose} className="right-4 top-4 w-3" />
        </div>

        <h2 className="body-16-bold text-neutral-90">{t('title')}</h2>

        <p className="mt-3 body-14-medium text-neutral-40">
          {t('descriptionLine1')}
          <br /> {t('descriptionLine2')}
        </p>

        <div className="mt-6 flex gap-2">
          <Button
            onClick={onClose}
            className={cn(
              'flex-1 h-9 body-14-medium px-0 bg-white border border-neutral-30 text-neutral-30',
            )}
          >
            {t('cancel')}
          </Button>

          <Button onClick={onConfirm} className={cn('flex-1 h-9 body-14-medium px-0')}>
            {t('confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
