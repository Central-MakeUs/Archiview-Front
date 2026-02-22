import Image from 'next/image';

import { Chip } from '@/shared/ui/Chip';
import { FolderIcon } from '@/shared/ui/icon';
import { openInstagramUrlDeepLinkOrPopup } from '@/shared/lib/external/openInstagramUrl.client';

export interface IPostPlace {
  postPlaceId: number;
  postId: number;
  instagramUrl: string;
  hashTags: string[];
  description: string;
  imageUrl: string;
  categoryNames: string[];
  editorName: string;
  editorInstagramId: string;
  isArchived: boolean;
}

export const CardSectionItem = ({
  post,
  onFolderClick,
  onClickReport,
}: {
  post: IPostPlace;
  onFolderClick: (postPlaceId: number, isArchived: boolean, editorName: string) => void;
  onClickReport: (postPlaceId: number) => void;
}) => {
  return (
    <div className="flex h-full">
      <div className="rounded-l-default bg-neutral-40 w-20 relative overflow-hidden">
        <Image
          alt="썸네일"
          src={post.imageUrl}
          fill
          className="object-cover"
          sizes="80px"
          priority={false}
          unoptimized
        />
      </div>
      <div className="rounded-r-default bg-[#F7F7F8] w-full flex flex-col gap-1 py-3 pl-3 pr-5">
        <div className="flex justify-between pb-3 border-b border-neutral-30">
          <div className="body-14-pretendard">
            {post.editorName}
            <p className="caption-12-semibold text-neutral-50">@ {post.editorInstagramId}</p>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onFolderClick(post.postPlaceId, post.isArchived, post.editorName)}
            >
              <FolderIcon active={post.isArchived} />
            </button>
            <button
              type="button"
              onClick={() => {
                openInstagramUrlDeepLinkOrPopup(post.instagramUrl);
              }}
            >
              <Image
                src="/images/instagramColoredIcon.svg"
                alt="인스타 아이콘"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
        <div className="caption-12-regular text-neutral-50">{post.description}</div>
        <div className="flex gap-1">
          {post.hashTags.map((tag) => (
            <Chip key={tag} label={tag} className="bg-primary-40 text-neutral-10 border-none" />
          ))}
          <button
            type="button"
            className="ml-auto caption-12-regular text-neutral-50"
            onClick={() => onClickReport(post.postPlaceId)}
          >
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
};
