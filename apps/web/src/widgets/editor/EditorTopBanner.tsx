'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/shared/lib/i18n/navigation';

import { Chip } from '@/shared/ui/Chip';
import { RightArrowIcon } from '@/shared/ui/icon';

interface IEditorTopBannerProps {
  editorNickname: string;
  placeCount: number;
}

export const EditorTopBanner = ({ editorNickname, placeCount }: IEditorTopBannerProps) => {
  const t = useTranslations('editorHome');

  return (
    <div className="relative h-62.75 w-full rounded-b-4xl bg-primary-30 px-5 pb-6 pt-8">
      <Image
        preload={true}
        src="/images/MainMarkerIcon.svg"
        alt={t('banner.markerAlt')}
        width={190}
        height={190}
        className="absolute right-1 top-12"
      />
      <Chip label={t('banner.chipEditor')} className="rounded-xl border-none bg-primary-40 text-white" />
      <div className="pt-3">
        <p className="heading-24-bold">{editorNickname}</p>
        <span className="heading-20-semibold">
          {t.rich('banner.placesShared', {
            count: placeCount,
            num: (chunks) => <span className="text-primary-40 underline">{chunks}</span>,
            br: () => <br />,
          })}
        </span>
        <p className="body-14-regular pt-3 text-primary-50">{t('banner.subtitle')}</p>
      </div>

      <Link
        href="/editor/register-place"
        className="flex flex-row items-center justify-end gap-1 pt-4"
      >
        <p className="caption-12-regular text-white underline">{t('banner.ctaShare')}</p>
        <RightArrowIcon className="h-2.5 text-white" />
      </Link>
    </div>
  );
};
