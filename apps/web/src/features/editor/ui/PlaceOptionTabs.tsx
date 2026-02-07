import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { OptionTabs } from '@/shared/ui/common/Tabs/OptionTabs';

export type PlaceOption =
  | 'ALL'
  | 'MOST_VIEWED'
  | 'MOST_SAVED'
  | 'MOST_INSTAGRAM'
  | 'MOST_DIRECTIONS';

const TABS: { label: string; value: PlaceOption }[] = [
  { label: '전체', value: 'ALL' },
  { label: '많이 조회 된', value: 'MOST_VIEWED' },
  { label: '많이 저장한', value: 'MOST_SAVED' },
  { label: '인스타 유입 된', value: 'MOST_INSTAGRAM' },
  { label: '길찾기 많은', value: 'MOST_DIRECTIONS' },
];

export const PlaceOptionTabs = ({ value }: { value: PlaceOption }) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

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
      items={TABS}
      value={current}
      onChange={setMetric}
      containerClassName="flex gap-2 overflow-x-auto whitespace-nowrap scroll-none pl-5 pr-5"
    />
  );
};
