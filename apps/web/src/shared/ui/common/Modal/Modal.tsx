interface IModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
}

export const Modal = ({ isOpen, onClose, children, closeOnOverlayClick = true }: IModalProps) => {
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

      <div className="relative z-10 w-full p-5 rounded-[20px] bg-white">{children}</div>
    </div>
  );
};
