'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/cn';

interface IModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  className?: string;
}

let modalLockCount = 0;
let originalBodyOverflow = '';
let originalHtmlOverflow = '';
let originalBodyTouchAction = '';
let originalHtmlTouchAction = '';

const lockBackgroundScroll = () => {
  if (modalLockCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    originalHtmlOverflow = document.documentElement.style.overflow;
    originalBodyTouchAction = document.body.style.touchAction;
    originalHtmlTouchAction = document.documentElement.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.documentElement.style.touchAction = 'none';
  }

  modalLockCount += 1;
};

const unlockBackgroundScroll = () => {
  if (modalLockCount === 0) return;

  modalLockCount -= 1;

  if (modalLockCount !== 0) return;

  document.body.style.overflow = originalBodyOverflow;
  document.documentElement.style.overflow = originalHtmlOverflow;
  document.body.style.touchAction = originalBodyTouchAction;
  document.documentElement.style.touchAction = originalHtmlTouchAction;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  className,
}: IModalProps) => {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    lockBackgroundScroll();

    return () => {
      unlockBackgroundScroll();
    };
  }, [isOpen]);

  if (!isOpen || !portalTarget) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (!closeOnOverlayClick) return;
          onClose?.();
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className={cn('relative z-10 rounded-default bg-white p-5', className)}>
          {children}
        </div>
      </div>
    </div>,
    portalTarget,
  );
};
