'use client';

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/shared/ui/Badge';
import { Kard } from '@/shared/ui/common/Kard';
import type { IEditor } from '@/entities/archiver/profile/model/archiverProfile.type';

interface IEditorRecommendCardProps {
  editor: IEditor;
}

export const EditorRecommendCard = ({ editor }: IEditorRecommendCardProps) => {
  const stripHash = (tag?: string) => (tag ?? '').trim().replace(/^#/, '');

  const badgeContainerRef = useRef<HTMLDivElement>(null);
  const badgeMeasureRefs = useRef<Array<HTMLDivElement | null>>([]);

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

  const [visibleBadgeCount, setVisibleBadgeCount] = useState(badges.length);

  const calculateVisibleBadgeCount = useCallback(() => {
    const containerWidth = badgeContainerRef.current?.clientWidth ?? 0;

    if (!containerWidth) {
      return;
    }

    const gap = 4;
    let occupiedWidth = 0;
    let nextVisibleCount = 0;

    for (let index = 0; index < badges.length; index += 1) {
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

    setVisibleBadgeCount(badges.length > 0 ? Math.max(nextVisibleCount, 1) : 0);
  }, [badges]);

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
    <Link href={`/archiver/editor-profile/${editor.editorId}`} className="block shrink-0">
      <Kard className="shrink-0 w-45 shadow-default overflow-hidden border-none">
        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: '99px' }}>
          <Image
            src={editor.profileImageUrl || '/images/ExampleImage.png'}
            alt=""
            width={200}
            height={90}
            className="object-cover"
            priority={false}
            unoptimized
          />
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="body-14-semibold">{editor.nickname}</span>
          </div>
          <div className="caption-12-regular text-neutral-50 mb-3">{editor.introduction}</div>
          <div className="relative">
            <div
              ref={badgeContainerRef}
              className="flex flex-nowrap items-center gap-1 overflow-hidden"
            >
              {badges.slice(0, visibleBadgeCount).map((badge) => (
                <Badge key={badge.key} variant="contained" className={badge.className}>
                  <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {badge.label}
                  </span>
                </Badge>
              ))}
            </div>

            <div className="absolute left-0 top-0 invisible pointer-events-none whitespace-nowrap">
              <div className="flex items-center gap-1">
                {badges.map((badge, index) => (
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
