import React from 'react';

import { PencilIcon } from '@/shared/ui/icon/place-info/PencilIcon';
import { Button } from '@/shared/ui/button';

interface IEditorProfileCardProps {
  profileImageUrl?: string;
  nickname: string;
  instagramId?: string;
  introduction?: string;
  hashtags?: string[];
  onEdit?: () => void;
  onShareInfo?: () => void;
}

export const EditorProfileCard = ({
  profileImageUrl,
  nickname,
  instagramId,
  introduction,
  hashtags = [],
  onEdit,
  onShareInfo,
}: IEditorProfileCardProps): React.ReactElement => {
  return (
    <div className="mx-5 flex flex-col overflow-hidden rounded-default shadow-[0px_0px_11px_0px_rgba(144,144,144,0.4)]">
      {/* 상단 파란색 영역 */}
      <div className="flex items-center bg-primary-30 p-5">
        <div className="flex flex-1 flex-col gap-4">
          {/* 프로필 이미지 + 닉네임 영역 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              {/* 프로필 이미지 */}
              <div className="size-[70px] shrink-0 overflow-hidden rounded-full bg-neutral-20">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={`${nickname} 프로필`}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-neutral-40">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* 닉네임 + 인스타 + 편집 버튼 */}
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="heading-20-bold text-primary-50">{nickname}</span>
                    {instagramId && (
                      <span className="body-14-semibold text-primary-10">@ {instagramId}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={onEdit}
                    className="shrink-0 p-0.5"
                    aria-label="프로필 편집"
                  >
                    <PencilIcon width={24} height={24} stroke="currentColor" className="text-primary-50" />
                  </button>
                </div>
              </div>
            </div>

            {/* 자기소개 */}
            {introduction && (
              <p className="body-14-medium text-neutral-10">{introduction}</p>
            )}
          </div>

          {/* 해시태그 */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {hashtags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="body-14-semibold inline-flex h-7 items-center rounded-xl bg-neutral-10 px-3 text-primary-40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 하단 흰색 영역 - 정보 공유하기 버튼 */}
      <div className="bg-neutral-10 px-5 pb-5 pt-4">
        <Button variant="contained" fullwidth onClick={onShareInfo} className="h-10 rounded-xl">
          + 정보 공유하기
        </Button>
      </div>
    </div>
  );
};
