'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface IInfoSupportSectionProps {
  onContact?: () => void;
  onReportBug?: () => void;
}

export const InfoSupportSection = ({
  onContact,
  onReportBug,
}: IInfoSupportSectionProps): React.ReactElement => {
  const t = useTranslations('mypage');

  return (
    <section>
      <h2 className="heading-20-bold px-5 pb-2 pt-6 text-neutral-90">{t('sectionInfo')}</h2>

      <button
        type="button"
        onClick={onContact}
        className="body-18-regular w-full px-5 py-3 text-left text-neutral-80"
      >
        {t('contact')}
      </button>

      <div className="mx-5 border-b border-neutral-30" />

      <button
        type="button"
        onClick={onReportBug}
        className="body-18-regular w-full px-5 py-3 text-left text-neutral-80"
      >
        {t('reportBug')}
      </button>

      <div className="mx-5 border-b border-neutral-30" />
    </section>
  );
};
