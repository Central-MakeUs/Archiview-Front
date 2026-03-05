'use client';

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/shared/ui/Badge';
import { Kard } from '@/shared/ui/common/Kard';

interface IHotPlaceCardProps {
  placeId: number;
  imageUrl: string;
  name: string;
  address: string;
  categoryNames: string[];
  hashTags: string[];
}

export const HotPlaceCard = ({
  placeId,
  imageUrl,
  name,
  categoryNames,
  hashTags,
  address,
}: IHotPlaceCardProps) => {
  const stripHash = (tag?: string) => (tag ?? '').trim().replace(/^#/, '');
  const safeImageUrl = imageUrl?.trimEnd();
  const badgeContainerRef = useRef<HTMLDivElement>(null);
  const badgeMeasureRefs = useRef<Array<HTMLDivElement | null>>([]);

  const allBadges = useMemo(
    () => [
      ...categoryNames.map((category, index) => ({
        key: `category-${category}-${index}`,
        label: category,
        className: 'rounded-xl bg-primary-40',
      })),
      ...hashTags.map((tag, index) => ({
        key: `hashtag-${tag}-${index}`,
        label: stripHash(tag),
        className: 'rounded-xl bg-primary-10 text-primary-40',
      })),
    ],
    [categoryNames, hashTags],
  );

  const [visibleBadgeCount, setVisibleBadgeCount] = useState(allBadges.length);

  const calculateVisibleBadgeCount = useCallback(() => {
    const containerWidth = badgeContainerRef.current?.clientWidth ?? 0;

    if (!containerWidth) {
      return;
    }

    const gap = 4;
    let occupiedWidth = 0;
    let nextVisibleCount = 0;

    for (let index = 0; index < allBadges.length; index += 1) {
      const badgeWidth = badgeMeasureRefs.current[index]?.offsetWidth ?? 0;

      if (!badgeWidth) {
        continue;
      }

      const requiredWidth = nextVisibleCount === 0 ? badgeWidth : occupiedWidth + gap + badgeWidth;

      if (requiredWidth > containerWidth) {
        break;
      }

      occupiedWidth = requiredWidth;
      nextVisibleCount += 1;
    }

    setVisibleBadgeCount(allBadges.length > 0 ? Math.max(nextVisibleCount, 1) : 0);
  }, [allBadges]);

  useLayoutEffect(() => {
    calculateVisibleBadgeCount();

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleBadgeCount();
    });

    if (badgeContainerRef.current) {
      resizeObserver.observe(badgeContainerRef.current);
    }

    badgeMeasureRefs.current.forEach((badgeElement) => {
      if (badgeElement) {
        resizeObserver.observe(badgeElement);
      }
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateVisibleBadgeCount]);

  return (
    <Link href={`place-info/${placeId}`} className="block shrink-0">
      <Kard className="flex flex-col w-45 shadow-default overflow-hidden border-none">
        {/* <div className="relative w-full aspect-3/2 shrink-0 overflow-hidden"> */}
        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: '99px' }}>
          <Image
            src={safeImageUrl}
            alt={name}
            fill
            className="object-cover"
            priority={false}
            unoptimized
          />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <span className="body-16-bold truncate">{name}</span>
          <span className="caption-12-regular text-neutral-50 block w-full truncate">
            {address}
          </span>
          <div className="relative">
            <div
              ref={badgeContainerRef}
              className="flex flex-nowrap items-center gap-1 overflow-hidden"
            >
              {allBadges.slice(0, visibleBadgeCount).map((badge) => (
                <Badge key={badge.key} variant="contained" className={badge.className}>
                  {badge.label}
                </Badge>
              ))}
            </div>
            <div className="absolute left-0 top-0 invisible pointer-events-none whitespace-nowrap">
              <div className="flex items-center gap-1">
                {allBadges.map((badge, index) => (
                  <div
                    key={`measure-${badge.key}`}
                    ref={(element) => {
                      badgeMeasureRefs.current[index] = element;
                    }}
                    className="inline-flex"
                  >
                    <Badge variant="contained" className={badge.className}>
                      {badge.label}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Kard>
    </Link>
  );
};
