import React from 'react';

export const EditProfilePageSkeleton = (): React.ReactElement => {
  return (
    <div className="flex flex-col px-5 h-full overflow-y-auto">
      <div className="flex flex-col gap-5">
        {/* 프로필 이미지 */}
        <div className="pt-6 flex justify-center">
          <div className="h-22.5 w-22.5 shrink-0 animate-pulse rounded-full bg-neutral-20" />
        </div>

        {/* 닉네임 */}
        <div>
          <div className="flex flex-row justify-between mb-3">
            <div className="h-4 w-16 animate-pulse rounded bg-neutral-20" />
            <div className="h-3 w-8 animate-pulse rounded bg-neutral-20" />
          </div>
          <div className="h-10 w-full animate-pulse rounded bg-neutral-20" />
        </div>

        {/* 한줄소개 */}
        <div>
          <div className="flex flex-row justify-between mb-3">
            <div className="h-4 w-14 animate-pulse rounded bg-neutral-20" />
            <div className="h-3 w-8 animate-pulse rounded bg-neutral-20" />
          </div>
          <div className="h-20 w-full animate-pulse rounded bg-neutral-20" />
        </div>

        {/* 인스타그램 아이디 */}
        <div>
          <div className="flex flex-row justify-between mb-3">
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-20" />
            <div className="h-3 w-8 animate-pulse rounded bg-neutral-20" />
          </div>
          <div className="h-10 w-full animate-pulse rounded bg-neutral-20" />
        </div>

        {/* 인스타그램 URL */}
        <div>
          <div className="flex flex-row justify-between mb-3">
            <div className="h-4 w-20 animate-pulse rounded bg-neutral-20" />
            <div className="h-3 w-8 animate-pulse rounded bg-neutral-20" />
          </div>
          <div className="h-10 w-full animate-pulse rounded bg-neutral-20" />
        </div>

        {/* 해시태그 */}
        <div>
          <div className="flex flex-row justify-between mb-3">
            <div className="h-4 w-48 animate-pulse rounded bg-neutral-20" />
            <div className="h-3 w-16 animate-pulse rounded bg-neutral-20" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-20 animate-pulse rounded bg-neutral-20" />
            <div className="h-10 w-20 animate-pulse rounded bg-neutral-20" />
          </div>
        </div>

        {/* 체크박스 */}
        <div className="flex flex-row items-center justify-center">
          <div className="h-4 w-4 animate-pulse rounded bg-neutral-20 mr-2" />
          <div className="h-4 w-40 animate-pulse rounded bg-neutral-20" />
        </div>
      </div>

      {/* 수정완료 버튼 */}
      <div className="pb-5 pt-3">
        <div className="h-12 w-full animate-pulse rounded bg-neutral-20" />
      </div>
    </div>
  );
};
