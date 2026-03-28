'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/shared/lib/i18n/navigation';

import { Button } from '@/shared/ui/button';
import { UpArrowIcon } from '@/shared/ui/icon';

import type { InsightPeriod } from '@/entities/editor/place/model/editorPlace.type';

export const PeriodDropdown = ({ value }: { value: InsightPeriod }) => {
  const t = useTranslations('editorHome');
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const periodLabel = useMemo(
    (): Record<InsightPeriod, string> => ({
      ALL: t('period.all'),
      WEEK: t('period.week'),
      MONTH: t('period.month'),
    }),
    [t],
  );

  const currentLabel = useMemo(() => periodLabel[value], [periodLabel, value]);

  const setPeriod = (next: InsightPeriod) => {
    const params = new URLSearchParams(sp?.toString() ?? '');
    params.set('period', next);

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen((v) => !v)}
        className="h-6.5 w-24 flex flex-row rounded-md border caption-12-semibold bg-white hover:bg-white border-primary-40 text-primary-40 justify-between items-center px-1"
      >
        {currentLabel}
        <span
          className={[
            'translate-y-px transition-transform duration-150',
            open ? 'rotate-0' : 'rotate-180',
          ].join(' ')}
        >
          <UpArrowIcon />
        </span>
      </Button>

      <div
        className={[
          'absolute right-0 mt-2 w-40 rounded-2xl bg-white shadow-lg border border-neutral-30 overflow-hidden',
          'origin-top-right transition-all duration-250 ease-out',
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none',
        ].join(' ')}
      >
        <Button
          type="button"
          onClick={() => setPeriod('ALL')}
          className="w-full justify-start rounded-none bg-white px-4 py-2 caption-12-medium text-neutral-50 hover:bg-white active:bg-primary-10"
        >
          {t('period.all')}
        </Button>
        <Button
          type="button"
          onClick={() => setPeriod('WEEK')}
          className="w-full justify-start rounded-none bg-white px-4 py-2 caption-12-medium text-neutral-50 hover:bg-white active:bg-primary-10"
        >
          {t('period.week')}
        </Button>
        <Button
          type="button"
          onClick={() => setPeriod('MONTH')}
          className="w-full justify-start rounded-none bg-white px-4 py-2 caption-12-medium text-neutral-50 hover:bg-white active:bg-primary-10"
        >
          {t('period.month')}
        </Button>
      </div>
    </div>
  );
};
