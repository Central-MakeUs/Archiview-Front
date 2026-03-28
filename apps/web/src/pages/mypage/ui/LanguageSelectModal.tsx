'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter as useNextRouter } from 'next/navigation';

import { usePathname, useRouter } from '@/shared/lib/i18n/navigation';
import { routing } from '@/shared/lib/i18n/routing';
import { cn } from '@/shared/lib/cn';
import { Modal } from '@/shared/ui/common/Modal/Modal';
import { XIcon } from '@/shared/ui/icon/XIcon';
import { CheckCircleIcon } from '@/shared/ui/icon';

interface ILanguageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectModal = ({ isOpen, onClose }: ILanguageSelectModalProps) => {
  const t = useTranslations('mypage');
  const locale = useLocale();
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();

  const handlePick = (next: (typeof routing.locales)[number]) => {
    if (next !== locale) {
      router.replace(pathname, { locale: next });
      queueMicrotask(() => {
        nextRouter.refresh();
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-70">
      <div className="relative rounded-default bg-white">
        <div className="flex h-5 justify-end">
          <XIcon onClick={onClose} className="right-4 top-4 w-3" />
        </div>

        <h2 className="body-16-bold text-neutral-90">{t('languageModal.title')}</h2>

        <ul className="mt-4 flex flex-col gap-0" role="listbox" aria-label={t('languageModal.title')}>
          {routing.locales.map((code) => {
            const isActive = code === locale;
            const label = code === 'ko' ? t('languageKo') : t('languageEn');

            return (
              <li key={code} className="border-t border-neutral-30 first:border-t-0 first:pt-0 pt-3">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    handlePick(code);
                  }}
                  className={cn(
                    'body-18-regular flex w-full items-center justify-between py-2 text-left text-neutral-80',
                    isActive && 'body-18-semibold text-neutral-90',
                  )}
                >
                  {label}
                  {isActive ? (
                    <CheckCircleIcon className="text-primary-50 shrink-0" width={20} height={20} />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};
