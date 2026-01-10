import { cn } from '@/shared/lib/cn';

interface ICardProps {
  thumbnail: React.ReactNode;
  children: React.ReactNode;
  selected?: boolean;
}

export const Card = ({ thumbnail, children, selected }: ICardProps): React.ReactElement => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl bg-white p-4 w-full',
        selected && 'border border-blue-500',
      )}
    >
      <div className="shrink-0 w-17 h-17">{thumbnail}</div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
};
