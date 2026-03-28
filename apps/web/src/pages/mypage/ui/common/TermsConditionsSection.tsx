'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface ITermsItem {
  label: string;
  key: string;
}

interface ITermsConditionsSectionProps {
  items: readonly ITermsItem[];
  onItemClick?: (key: string) => void;
}

export const TermsConditionsSection = ({
  items,
  onItemClick,
}: ITermsConditionsSectionProps): React.ReactElement => {
  const t = useTranslations('mypage');

  return (
    <section>
      <h2 className="heading-20-bold px-5 pb-2 pt-6 text-neutral-90">{t('sectionTerms')}</h2>

      {items.map((item, index) => (
        <React.Fragment key={item.key}>
          <button
            type="button"
            onClick={() => onItemClick?.(item.key)}
            className="body-18-regular w-full px-5 py-3 text-left text-neutral-80"
          >
            {item.label}
          </button>

          {index < items.length - 1 && <div className="mx-5 border-b border-neutral-30" />}
        </React.Fragment>
      ))}
    </section>
  );
};
