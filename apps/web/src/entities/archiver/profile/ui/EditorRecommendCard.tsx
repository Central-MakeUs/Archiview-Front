'use client';

import { memo, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/shared/ui/Badge';
import { Kard } from '@/shared/ui/common/Kard';
import type { IEditor } from '@/entities/archiver/profile/model/archiverProfile.type';

interface IEditorRecommendCardProps {
  editor: IEditor;
  /** 화면에 처음 보이는 카드일 경우 true - 이미지 즉시 로드 */
  priority?: boolean;
}

const MAX_VISIBLE_BADGES = 2;

const stripHash = (tag?: string) => (tag ?? '').trim().replace(/^#/, '');

const EditorRecommendCardComponent = ({ editor }: IEditorRecommendCardProps) => {
  const badges = useMemo(
    () =>
      (editor.hashtags ?? []).map((tag, index) => ({
        key: `hashtag-${tag}-${index}`,
        label: stripHash(tag),
        className:
          index === 0
            ? 'rounded-xl bg-primary-40 max-w-full overflow-hidden whitespace-nowrap'
            : 'rounded-xl bg-primary-10 text-primary-40 max-w-full overflow-hidden whitespace-nowrap',
      })),
    [editor.hashtags],
  );
  const visibleBadges = badges.slice(0, MAX_VISIBLE_BADGES);

  return (
    <Link href={`/archiver/editor-profile/${editor.editorId}`} className="block shrink-0">
      <Kard className="shrink-0 w-45 shadow-default overflow-hidden border-none">
        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: '99px' }}>
          <Image
            src={editor.profileImageUrl || '/images/ExampleImage.png'}
            alt=""
            width={200}
            height={90}
            className="object-cover"
            sizes="180px"
            priority={false}
          />
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="body-14-semibold">{editor.nickname}</span>
          </div>
          <div className="caption-12-regular text-neutral-50 mb-3">{editor.introduction}</div>
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

export const EditorRecommendCard = memo(EditorRecommendCardComponent);
EditorRecommendCard.displayName = 'EditorRecommendCard';
