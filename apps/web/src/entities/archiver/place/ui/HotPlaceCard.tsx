import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/shared/ui/Badge';
import { FolderIcon } from '@/shared/ui/icon';
import { Card } from '@/shared/ui/common/Card';

interface IHotPlaceCardProps {
  placeId: number;
  imageUrl: string;
  name: string;
  address: string;
  categoryNames: string[];
  hashTags: string[];
  // viewCount: number;
}

// TODO : 이것을 쓸까요?
function pickRandom<T>(arr: readonly T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

export const HotPlaceCard = ({
  placeId,
  imageUrl,
  name,
  categoryNames,
  hashTags,
  address,
}: IHotPlaceCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const categoryName = pickRandom(categoryNames);
  const hashTag = pickRandom(hashTags);

  const stripHash = (tag?: string) => (tag ?? '').trim().replace(/^#/, '');

  const handleFavoriteClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite((prev) => !prev);
  };

  return (
    // TODO : 라우팅 연결하기
    <Link href={`place-info/${placeId}`} className="block shrink-0">
      <Card className="flex flex-col h-52 w-46 shadow-default overflow-hidden border-none">
        {/* 이거 스타일 하드코딩 어케고치지 */}
        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: '99px' }}>
          <Image
            src={imageUrl}
            alt=""
            width={200}
            height={90}
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="p-3 flex-1 min-h-0">
          <div className="flex items-center justify-between">
            <span className="body-14-semibold">{name}</span>
            <span>
              <FolderIcon active={isFavorite} onClick={handleFavoriteClick} />
            </span>
          </div>
          <div className="caption-12-regular text-neutral-50 mb-3">{address}</div>
          <div className="flex items-center gap-1">
            <span>
              <Badge variant="contained" className="rounded-xl bg-primary-40">
                {categoryName}
              </Badge>
            </span>
            <span>
              <Badge variant="contained" className="rounded-xl bg-primary-10 text-primary-40">
                {stripHash(hashTag)}
              </Badge>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
