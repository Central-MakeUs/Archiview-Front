import React from 'react';

import { PencilIcon } from '@/shared/ui/icon/place-info/PencilIcon';
import { Chip } from '@/shared/ui/Chip';

interface IEditorInfoCardProps {
  profileImageUrl?: string;
  nickname: string;
  instagramId?: string;
  tags?: string[];
  onEdit?: () => void;
}

export const EditorInfoCard = ({
  profileImageUrl,
  nickname,
  instagramId,
  tags = [],
  onEdit,
}: IEditorInfoCardProps): React.ReactElement => {
  return (
    <div className="flex items-center gap-4 rounded-default bg-primary-30 px-5 py-4">
      {/* 프로필 이미지 */}
      <div className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-neutral-20">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={`${nickname} 프로필`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-40">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>

      {/* 닉네임 + 인스타 + 태그 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-col">
          <span className="heading-20-bold text-primary-50">{nickname}</span>
          {instagramId && <span className="body-14-regular text-primary-10">@ {instagramId}</span>}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <Chip
                key={`${tag}-${index}`}
                label={tag}
                variant="default"
                className="pointer-events-none border-primary-30 text-primary-30 bg-neutral-10"
              />
            ))}
          </div>
        )}
      </div>

      {/* 편집 버튼 */}
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 self-start p-1 text-neutral-50"
        aria-label="프로필 편집"
      >
        <PencilIcon width={20} height={20} />
      </button>
    </div>
  );
};
