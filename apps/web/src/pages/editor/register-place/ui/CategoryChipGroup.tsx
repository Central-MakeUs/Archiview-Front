import { ICategories } from '@/entities/common/model/common.type';
import { useGetCategories } from '@/entities/common/queries/useGetCategories';
import { Chip } from '@/shared/ui/Chip';

interface ICategoryChipGroupProps {
  selectedIds: number[];
  onToggle: (id: number) => void;
}

export const CategoryChipGroup = ({ selectedIds, onToggle }: ICategoryChipGroupProps) => {
  const { data: categories } = useGetCategories();

  return (
    <div className="flex gap-2 flex-wrap">
      {categories?.map((category: ICategories) => {
        const isSelected = selectedIds.includes(category.id);
        return (
          <Chip
            key={category.id}
            label={category.name}
            selected={isSelected}
            onClick={() => onToggle(category.id)}
            className={`h-9 px-4 rounded-xl border ${
              isSelected
                ? 'border-none text-neutral-10 bg-primary-40'
                : 'border-none bg-neutral-20 text-neutral-40'
            }`}
          />
        );
      })}
    </div>
  );
};
