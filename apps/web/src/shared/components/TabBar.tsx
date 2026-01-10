import { cn } from '../lib/cn';

interface ITabItem<T extends string> {
  value: T;
  label: string;
}

interface ITabBarProps<T extends string> {
  items: readonly ITabItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

export const TabBar = <T extends string>({
  items,
  value,
  onChange,
}: ITabBarProps<T>): React.ReactNode => {
  return (
    <div
      role="tablist"
      className="grid w-full border-b-[0.8px] border-neutral-20 px-5 gap-1"
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              'relative py-3 text-center body-16-bold',
              active ? 'text-black' : 'text-gray-400',
            )}
          >
            {item.label}
            {active && <div className="absolute bottom-0 left-0 h-[1.8px] w-full bg-black" />}
          </button>
        );
      })}
    </div>
  );
};
