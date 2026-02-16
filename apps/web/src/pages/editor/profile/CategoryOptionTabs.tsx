'use client';

import { OptionTabs } from '@/shared/ui/common/Tabs/OptionTabs';

// TODO : 주석 해제 (내주변 기능 추가)
export type CategoryTab =
  | '전체'
  | '내주변'
  | '한식'
  | '양식'
  | '일식'
  | '이자카야'
  | '카페'
  | '데이트'
  | '기타';

const CATEGORY_TABS: { label: string; value: CategoryTab }[] = [
  { label: '전체', value: '전체' },
  { label: '내주변', value: '내주변' },
  { label: '한식', value: '한식' },
  { label: '양식', value: '양식' },
  { label: '일식', value: '일식' },
  { label: '이자카야', value: '이자카야' },
  { label: '카페', value: '카페' },
  { label: '데이트', value: '데이트' },
  { label: '기타', value: '기타' },
];

interface IProps {
  value: CategoryTab;
  onChange: (next: CategoryTab) => void;
}

// TODO : 엔티티 분리되면 엔티티로 빼기 (아카이버랑 공용으로 사용함)

export const CategoryOptionTabs = ({ value, onChange }: IProps) => {
  return (
    <OptionTabs
      items={CATEGORY_TABS}
      value={value}
      onChange={onChange}
      containerClassName="pl-5 flex gap-2 overflow-x-auto whitespace-nowrap scroll-none pt-6"
    />
  );
};
