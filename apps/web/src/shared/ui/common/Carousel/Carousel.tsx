'use client';

import { useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '@/shared/lib/cn';

interface ICarouselProps {
  children: React.ReactNode;
  onIndexChange?: (index: number) => void;
  showIndicator?: boolean;
  loop?: boolean;
  className?: string;
}

/**
 * 캐러셀 공통 컴포넌트
 * @props
 * @property {React.ReactNode} children 슬라이드
 * @property {(index: number) => void} [onIndexChange] 선택된 슬라이드 인덱스가 변경될 때 호출되는 콜백
 * @property {boolean} [showIndicator] 하단 인디케이터 표시 여부
 * @property {boolean} [loop=false] 순환 여부
 * @property {string} [className]
 */
export const Carousel = ({
  children,
  onIndexChange,
  showIndicator,
  loop = false,
  className,
}: ICarouselProps) => {
  const slides = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setCurrentIndex(index);
      onIndexChange?.(index);
    };

    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onIndexChange]);

  return (
    <div className={cn('flex flex-col', className)}>
      {/* viewport */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="h-full w-full shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showIndicator && (
        <div className="mt-4 inline-flex items-center gap-1">
          {slides.map((_, index) => (
            <span
              key={index}
              className={cn(
                'h-2 w-2 rounded-full bg-neutral-30',
                currentIndex === index && 'bg-primary-40',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
