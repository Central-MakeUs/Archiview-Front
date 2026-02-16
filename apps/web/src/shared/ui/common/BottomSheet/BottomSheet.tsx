import { cn } from '@/shared/lib/cn';
import { useRef, useState } from 'react';

interface IBottomSheetProps {
  isOpen?: boolean;
  lockOpen?: boolean;

  onOpenChange: (open: boolean) => void;

  height: number;
  peekHeight: number;

  bottomOffset?: number | string;

  header?: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * 바텀시트 공통 컴포넌트
 *
 * 뷰포트 하단에 고정되어 항상 노출되며, 접힘/펼침 상태만 전환된다.
 * @props
 * @property {boolean} isOpen 바텀시트가 펼쳐진 상태인지 여부
 * @property {(open: boolean) => void} onOpenChange 펼침/접힘 상태 변경 콜백
 * @property {number} height 바텀시트가 완전히 펼쳐졌을 때의 높이(px)
 * @property {number} peekHeight 바텀시트가 접힌 상태에서 노출되는 높이(px)
 * 바텀시트 내부 콘텐츠가 많아 스크롤 필요할 경우 chidren 내에서 overflow-y-auto 등으로 스크롤 구현해야함
 */
export const BottomSheet = ({
  isOpen,
  lockOpen,
  onOpenChange,
  height,
  peekHeight,
  bottomOffset = 'var(--navigation-footer-height, 0px)',
  header,
  headerClassName,
  contentClassName,
  className,
  children,
}: IBottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const startYRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  const closedOffset = height - peekHeight;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (lockOpen) return;
    startYRef.current = e.clientY;
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (lockOpen) return;
    if (startYRef.current === null) return;

    const diff = e.clientY - startYRef.current;

    if (!isDraggingRef.current && Math.abs(diff) < 4) return;

    if (isOpen && diff < 0) return;

    if (!isOpen && diff > 0) return;

    if (!isDraggingRef.current) {
      isDraggingRef.current = true;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    }

    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (lockOpen) return;

    if (startYRef.current === null) return;

    if (!isDraggingRef.current) {
      startYRef.current = null;
      setDragOffset(0);
      return;
    }

    const threshold = height * 0.15;

    if (isOpen && dragOffset > threshold) {
      onOpenChange(false);
    } else if (!isOpen && dragOffset < -threshold) {
      onOpenChange(true);
    }

    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    startYRef.current = null;
    isDraggingRef.current = false;
    setDragOffset(0);
  };

  const baseTranslateY = isOpen ? 0 : closedOffset;

  return (
    <div
      ref={sheetRef}
      className={cn(
        'fixed flex flex-col w-full max-w-125 left-1/2 z-40 h-full rounded-t-default bg-white',
        'transition-transform duration-250 ease-out',
        className,
      )}
      style={{
        height,
        bottom: typeof bottomOffset === 'number' ? `${bottomOffset}px` : bottomOffset,
        transform: `translateX(-50%) translateY(${baseTranslateY + dragOffset}px)`,
      }}
    >
      <div
        className={cn('shrink-0 touch-none select-none', headerClassName)}
        style={header ? { height: peekHeight } : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="flex justify-center pt-1.25">
          <div className="h-[5px] w-[36px] rounded-[2.5px] bg-[rgba(60,60,67,0.3)]" />
        </div>
        {header}
      </div>

      <div className={cn('flex-1 min-h-0', contentClassName)}>{children}</div>
    </div>
  );
};
