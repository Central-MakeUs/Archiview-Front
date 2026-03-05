'use client';

import { memo, useMemo } from 'react';
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

const MAX_VISIBLE_BADGES = 3;

const stripHash = (tag?: string) => (tag ?? '').trim().replace(/^#/, '');

const HotPlaceCardComponent = ({
  placeId,
  imageUrl,
  name,
  categoryNames,
  hashTags,
  address,
}: IHotPlaceCardProps) => {
  const safeImageUrl = imageUrl?.trim() || '/images/ExampleImage.png';

  const badges = useMemo(
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
  const visibleBadges = badges.slice(0, MAX_VISIBLE_BADGES);

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
            sizes="180px"
            priority={false}
          />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <span className="body-16-bold truncate">{name}</span>
          <span className="caption-12-regular text-neutral-50 block w-full truncate">
            {address}
          </span>
          <div className="flex flex-nowrap items-center gap-1 overflow-hidden">
            {visibleBadges.map((badge) => (
              <Badge key={badge.key} variant="contained" className={badge.className}>
                <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {badge.label}
                </span>
              </Badge>
            ))}
          </div>
        </div>
      </Kard>
    </Link>
  );
};

export const HotPlaceCard = memo(HotPlaceCardComponent);
HotPlaceCard.displayName = 'HotPlaceCard';
