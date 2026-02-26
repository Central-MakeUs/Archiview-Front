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
  const hashTags = editor.hashtags ?? [];
  const safeImageUrl = editor.profileImageUrl?.trimEnd() ?? '';

  return (
    <Link href={`/archiver/editor-profile/${editor.editorId}`} className="block shrink-0">
      <Kard className="flex flex-col w-52 shadow-default overflow-hidden border-none">
        <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden">
          <Image
            src={safeImageUrl}
            alt={editor.nickname}
            fill
            className="object-cover"
            priority={false}
            unoptimized
          />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <span className="body-16-bold truncate">{editor.nickname}</span>
          <span className="caption-12-regular text-neutral-50 line-clamp-2">
            {editor.introduction}
          </span>
          <div className="flex flex-wrap items-center gap-1">
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
