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
    const nextCategoryIds = value.categoryIds.includes(categoryId) ? [] : [categoryId];

    onChange({
      ...value,
      categoryIds: nextCategoryIds,
    });
  };

  return (
    <div className="pl-5 pt-6 flex items-center gap-2">
      <div className="flex items-center gap-2 flex-none">
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
      </div>

      <div aria-hidden className="w-px h-8 bg-neutral-30 self-center flex-none mx-1" />

      <div className="min-w-0 flex-1 relative">
        <div className="min-w-0 flex-1 overflow-x-auto scroll-none">
          <div className="flex items-center gap-2 pr-5 whitespace-nowrap pl-1">
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
        </div>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-2 bg-gradient-to-r from-neutral-10 to-transparent" />
      </div>
    </div>
  );
};
