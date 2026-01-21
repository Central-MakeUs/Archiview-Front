import { cn } from '@/shared/lib/cn';

interface IModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  className,
}: IModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (!closeOnOverlayClick) return;
          onClose?.();
        }}
      />

      <div className={cn('relative z-10 p-5 rounded-default bg-white', className)}>{children}</div>
    </div>
  );
};
