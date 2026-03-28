'use client';

import { useTranslations } from 'next-intl';
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
  const t = useTranslations('archiverPlaceInfo.archiveModal');
  const isUnarchive = type === 'unarchive';

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-70">
      <div className="relative rounded-default bg-white text-center">
        <div className="flex justify-end h-5">
          <XIcon onClick={onClose} className="right-4 top-4 w-3" />
        </div>

        <h2 className="body-16-bold text-neutral-90 pb-5">
          {isUnarchive ? t('titleUnarchive') : t('titleArchive')}
        </h2>
        <span className="body-14-bold text-primary-40">{place}</span>
        <p className="mt-3 body-14-bold text-neutral-40">
          {t.rich(isUnarchive ? 'descriptionUnarchive' : 'descriptionArchive', {
            editor,
            highlight: (chunks) => <span className="text-primary-40">{chunks}</span>,
            br: () => <br />,
          })}
        </p>

        <div className="mt-6 flex gap-2">
          <Button onClick={onConfirm} className={cn('flex-1 h-9 body-14-medium px-0')}>
            {t('confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
