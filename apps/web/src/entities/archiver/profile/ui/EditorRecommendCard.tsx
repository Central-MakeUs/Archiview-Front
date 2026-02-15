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
console.log(editor.profileImageUrl);
  return (
    // TODO : 라우팅 연결하기
    <Link href={`/archiver/editor-profile/${editor.editorId}`} className="block shrink-0">
      <Kard className="shrink-0 h-52 w-46 shadow-default overflow-hidden border-none">
        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: '99px' }}>
          <Image
            src={editor.profileImageUrl ?? ""}
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
          <div className="flex items-center gap-1">
            <span>
              <Badge variant="contained" className="rounded-xl bg-primary-40">
                {stripHash(editor.hashtags?.[0])}
              </Badge>
            </span>
            <span>
              <Badge variant="contained" className="rounded-xl bg-primary-10 text-primary-40">
                {stripHash(editor.hashtags[1] ?? '')}
              </Badge>
            </span>
          </div>
        </div>
      </Kard>
    </Link>
  );
};
