import { cn } from '../lib/cn';

interface ITabItem<T extends string> {
  key: T;
  label: string;
}

interface ITabBarProps<T extends string> {
  items: readonly ITabItem<T>[];
  value: T;
  onChange: (key: T) => void;
}

export const TabBar = <T extends string>({ items, value, onChange }: ITabBarProps<T>) => {
  return (
    <div
      role="tablist"
      className="grid border-t"
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
      {items.map((item) => {
        const active = item.key === value;

        return (
          <button
            key={item.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.key)}
            className={cn(
              'relative py-3 text-center',
              active ? 'text-black font-semibold' : 'text-gray-400',
            )}
          >
            {item.label}
            {active && <div className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />}
          </button>
        );
      })}
    </div>
  );
};
