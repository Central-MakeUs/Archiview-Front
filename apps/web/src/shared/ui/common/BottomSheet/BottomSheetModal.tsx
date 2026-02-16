import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/shared/lib/cn';

import { BottomSheet } from './BottomSheet';

interface IBottomSheetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  height: number;

  children: React.ReactNode;

  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

export const BottomSheetModal = ({
  open,
  onOpenChange,
  height,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
}: IBottomSheetModalProps) => {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => setMounted(false), 250);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !closeOnEsc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mounted, closeOnEsc, onOpenChange]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn('fixed inset-0 z-40', className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (closeOnOverlayClick) onOpenChange(false);
            }}
          />

          <motion.div
            className="absolute left-0 right-0 bottom-0"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          >
            <BottomSheet
              isOpen={true}
              onOpenChange={onOpenChange}
              height={height}
              peekHeight={0}
              bottomOffset={0}
            >
              {children}
            </BottomSheet>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
