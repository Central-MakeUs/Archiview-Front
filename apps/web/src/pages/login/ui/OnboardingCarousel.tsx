'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { Carousel, type ICarouselHandle } from '@/shared/ui/common/Carousel/Carousel';
import { cn } from '@/shared/lib/cn';

interface IOnboardingText {
  title: string;
  description: string;
}

export interface IOnboardingCarouselHandle {
  scrollNext: () => void;
  canScrollNext: () => boolean;
}

interface IOnboardingCarouselProps {
  children: React.ReactNode;
  items: IOnboardingText[];
}

const FadeText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=" inset-0"
      style={{
        animation: 'fadeUp 400ms ease-out',
      }}
    >
      {children}

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export const OnboardingCarousel = forwardRef<IOnboardingCarouselHandle, IOnboardingCarouselProps>(
  ({ children, items }, ref) => {
    const [index, setIndex] = useState(0);
    const carouselRef = useRef<ICarouselHandle>(null);

    const slideCount = Array.isArray(children) ? children.length : 1;

    useImperativeHandle(ref, () => ({
      scrollNext: () => carouselRef.current?.scrollNext(),
      canScrollNext: () => carouselRef.current?.canScrollNext() ?? false,
    }));

    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6">
        {/* Carousel (비주얼만 이동) */}
        <div>
          <Carousel ref={carouselRef} onIndexChange={setIndex} className="h-full">
            {children}
          </Carousel>
        </div>

      {/* Fixed Text Area */}
      <div className="flex shrink-0 flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-5 text-center">
          <FadeText key={index}>
            <h2 className="heading-24-bold">{items[index]?.title}</h2>
            <p className="mt-5 whitespace-pre-line body-14-semibold text-primary-50">
              {items[index]?.description}
            </p>
          </FadeText>
        </div>

        {/* Indicator */}
        <div className="inline-flex items-center justify-center gap-1">
          {Array.from({ length: slideCount }).map((_, i) => (
            <span
              key={i}
              className={cn('h-2 w-2 rounded-full bg-neutral-30', index === i && 'bg-primary-40')}
            />
          ))}
        </div>
      </div>
    </div>
  );
  },
);

OnboardingCarousel.displayName = 'OnboardingCarousel';
