'use client';

import { OptionTabs } from '@/shared/ui/common/Tabs/OptionTabs';

export type CategoryTab =
  | 'ALL'
  | 'NEAR'
  | 'KOREAN'
  | 'WESTERN'
  | 'JAPANESE'
  | 'IZAKAYA'
  | 'CAFE'
  | 'DATE'
  | 'ETC';

const CATEGORY_TABS: { label: string; value: CategoryTab }[] = [
  { label: '전체', value: 'ALL' },
  { label: '내주변', value: 'NEAR' },
  { label: '한식', value: 'KOREAN' },
  { label: '양식', value: 'WESTERN' },
  { label: '일식', value: 'JAPANESE' },
  { label: '이자카야', value: 'IZAKAYA' },
  { label: '카페', value: 'CAFE' },
  { label: '데이트', value: 'DATE' },
  { label: '기타', value: 'ETC' },
];

interface IProps {
  value: CategoryTab;
  onChange: (next: CategoryTab) => void;
}

export const ProfileCategoryOptionTabs = ({ value, onChange }: IProps) => {
  return (
    <OptionTabs
      items={CATEGORY_TABS}
      value={value}
      onChange={onChange}
      containerClassName="pl-5 flex gap-2 overflow-x-auto whitespace-nowrap scroll-none pt-6"
    />
  );
};
