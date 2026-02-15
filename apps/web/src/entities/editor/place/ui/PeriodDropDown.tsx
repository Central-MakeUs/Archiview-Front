import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { UpArrowIcon } from '@/shared/ui/icon';

import type { InsightPeriod } from '@/entities/editor/place/model/editorPlace.type';

const PERIOD_LABEL: Record<InsightPeriod, string> = {
  ALL: '전체 기간',
  WEEK: '7일',
  MONTH: '30일',
};

export const PeriodDropdown = ({ value }: { value: InsightPeriod }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const currentLabel = useMemo(() => PERIOD_LABEL[value], [value]);

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
        className="h-6.5 w-22 flex flex-row rounded-md border caption-12-semibold bg-white hover:bg-white border-primary-40 text-primary-40 justify-between items-center px-1"
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
          className="w-full justify-start px-4 py-2 rounded-none active:bg-primary-10 bg-white hover:bg-white caption-12-medium text-neutral-50"
        >
          전체 기간
        </Button>
        <Button
          type="button"
          onClick={() => setPeriod('WEEK')}
          className="w-full justify-start px-4 py-2 rounded-none active:bg-primary-10 bg-white hover:bg-white caption-12-medium text-neutral-50"
        >
          7일
        </Button>
        <Button
          type="button"
          onClick={() => setPeriod('MONTH')}
          className="w-full justify-start px-4 py-2 rounded-none active:bg-primary-10 bg-white hover:bg-white caption-12-medium text-neutral-50"
        >
          30일
        </Button>
      </div>
    </div>
  );
};
