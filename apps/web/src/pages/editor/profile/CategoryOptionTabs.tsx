'use client';

import { CATEGORIES } from '@/shared/constants/category';

export type CategoryScope = '전체' | '내주변';
export type CategoryTab = (typeof CATEGORIES)[number]['name'];

export interface ICategoryOptionValue {
  scope: CategoryScope;
  categoryIds: number[];
}

const SCOPE_TABS: { label: string; value: CategoryScope }[] = [
  { label: '전체', value: '전체' },
  { label: '내주변', value: '내주변' },
];

const CATEGORY_TABS = CATEGORIES.map((category) => ({
  label: category.name,
  value: category.id,
}));

const ACTIVE_BUTTON_CLASS = 'bg-primary-40 text-white';
const INACTIVE_BUTTON_CLASS = 'bg-neutral-20 text-neutral-40';

interface IProps {
  value: ICategoryOptionValue;
  onChange: (next: ICategoryOptionValue) => void;
}

// TODO : 엔티티 분리되면 엔티티로 빼기 (아카이버랑 공용으로 사용함)

export const CategoryOptionTabs = ({ value, onChange }: IProps) => {
  const handleScopeChange = (scope: CategoryScope) => {
    onChange({
      ...value,
      scope,
    });
  };

  const handleCategoryToggle = (categoryId: number) => {
    const nextCategoryIds = value.categoryIds.includes(categoryId)
      ? value.categoryIds.filter((id) => id !== categoryId)
      : [...value.categoryIds, categoryId];

    onChange({
      ...value,
      categoryIds: nextCategoryIds,
    });
  };

  return (
    <div className="pl-5 flex gap-2 overflow-x-auto whitespace-nowrap scroll-none pt-6">
      {SCOPE_TABS.map((tab) => {
        const active = value.scope === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleScopeChange(tab.value)}
            className={[
              'h-9 px-3 rounded-xl body-14-semibold flex-none w-auto whitespace-nowrap transition-colors',
              active ? ACTIVE_BUTTON_CLASS : INACTIVE_BUTTON_CLASS,
            ].join(' ')}
          >
            {tab.label}
          </button>
        );
      })}

      {CATEGORY_TABS.map((tab) => {
        const active = value.categoryIds.includes(tab.value);

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleCategoryToggle(tab.value)}
            className={[
              'h-9 px-3 rounded-xl body-14-semibold flex-none w-auto whitespace-nowrap transition-colors',
              active ? ACTIVE_BUTTON_CLASS : INACTIVE_BUTTON_CLASS,
            ].join(' ')}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
