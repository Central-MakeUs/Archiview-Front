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

  return (
    <Link href={`place-info/${placeId}`} className="block shrink-0">
      <Kard className="flex flex-col w-52 shadow-default overflow-hidden border-none">
        <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden">
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
          <span className="caption-12-regular text-neutral-50">{address}</span>
          <div className="flex flex-wrap items-center gap-1">
            {categoryNames.map((cat) => (
              <Badge key={cat} variant="contained" className="rounded-xl bg-primary-40">
                {cat}
              </Badge>
            ))}
            {hashTags.map((tag) => (
              <Badge
                key={tag}
                variant="contained"
                className="rounded-xl bg-primary-10 text-primary-40"
              >
                {stripHash(tag)}
              </Badge>
            ))}
          </div>
        </div>
      </Kard>
    </Link>
  );
};
