'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/shared/lib/i18n/navigation';

import { OptionTabs } from '@/shared/ui/common/Tabs/OptionTabs';

export type PlaceOption =
  | 'ALL'
  | 'MOST_VIEWED'
  | 'MOST_SAVED'
  | 'MOST_INSTAGRAM'
  | 'MOST_DIRECTIONS';

export const PlaceOptionTabs = ({ value }: { value: PlaceOption }) => {
  const t = useTranslations('editorHome');
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const tabs = useMemo(
    () =>
      [
        { label: t('tabs.all'), value: 'ALL' as const },
        { label: t('tabs.mostViewed'), value: 'MOST_VIEWED' as const },
        { label: t('tabs.mostSaved'), value: 'MOST_SAVED' as const },
        { label: t('tabs.mostInstagram'), value: 'MOST_INSTAGRAM' as const },
        { label: t('tabs.mostDirections'), value: 'MOST_DIRECTIONS' as const },
      ] satisfies { label: string; value: PlaceOption }[],
    [t],
  );

  const current = useMemo(() => value ?? 'ALL', [value]);

  const setMetric = (next: PlaceOption) => {
    const params = new URLSearchParams(sp?.toString() ?? '');

    if (next === 'ALL') {
      params.delete('metric');
    } else {
      params.set('metric', next);
    }

    const qs = params.toString();
    const path = pathname ?? '/';
    router.push(qs ? `${path}?${qs}` : path);
  };

  return (
    <OptionTabs
      items={tabs}
      value={current}
      onChange={setMetric}
      containerClassName="flex gap-2 overflow-x-auto whitespace-nowrap scroll-none pl-5 pr-5"
      inactiveClassName="bg-neutral-20 text-neutral-40 hover:text-neutral-10"
    />
  );
};
