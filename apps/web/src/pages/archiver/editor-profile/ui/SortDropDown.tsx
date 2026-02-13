import { useMemo, useState } from 'react';

import { UpArrowIcon } from '@/shared/ui/icon';

type SortKey = 'LATEST' | 'OLDEST';

const SORT_LABEL: Record<SortKey, string> = {
  LATEST: '최신순',
  OLDEST: '등록순',
};

export const SortDropdown = ({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (next: SortKey) => void;
}) => {
  const [open, setOpen] = useState(false);

  const currentLabel = useMemo(() => SORT_LABEL[value], [value]);

  const select = (next: SortKey) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-6.5 w-20 inline-flex items-center justify-center gap-2 rounded-md border-2 border-primary-40 bg-white text-primary-40 caption-12-semibold"
      >
        <span className="text-base">{currentLabel}</span>
        <span
          className={['transition-transform duration-150', open ? 'rotate-180' : 'rotate-0'].join(
            ' ',
          )}
        >
          <UpArrowIcon />
        </span>
      </button>

      <div
        className={[
          'absolute right-0 mt-3 w-64 rounded-2xl bg-white shadow-xl border border-neutral-30 overflow-hidden',
          'origin-top-right transition-all duration-200 ease-out',
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none',
        ].join(' ')}
      >
        <div className="px-4 pb-2 pt-4 text-neutral-80 caption-12-medium">정렬</div>

        <button
          type="button"
          onClick={() => select('LATEST')}
          className={[
            'w-full text-left px-4 py-2  body-14-regular',
            value === 'LATEST' ? 'bg-primary-10 text-neutral-90' : 'bg-white text-neutral-60',
          ].join(' ')}
        >
          최신순
        </button>

        <button
          type="button"
          onClick={() => select('OLDEST')}
          className={[
            'w-full text-left px-4 py-2 body-14-regular',
            value === 'OLDEST' ? 'bg-primary-10 text-neutral-90' : 'bg-white text-neutral-60',
          ].join(' ')}
        >
          등록순
        </button>
      </div>
    </div>
  );
};
