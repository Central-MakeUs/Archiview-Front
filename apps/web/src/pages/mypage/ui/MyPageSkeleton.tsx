import React from 'react';

export const MyPageSkeleton = (): React.ReactElement => {
  return (
    <div className="flex flex-1 flex-col">
      {/* 프로필 카드 스켈레톤 */}
      <div className="px-5 pt-4">
        <div className="flex items-center gap-4 rounded-default bg-primary-30 p-5">
          <div className="size-[60px] shrink-0 animate-pulse rounded-full bg-neutral-20" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-6 w-24 animate-pulse rounded bg-neutral-20" />
            <div className="h-4 w-16 animate-pulse rounded bg-neutral-20" />
          </div>
        </div>
      </div>

      {/* 계정관리 스켈레톤 */}
      <section className="pt-6">
        <div className="h-7 w-20 animate-pulse rounded bg-neutral-20 px-5 pb-2" />
        <div className="px-5 py-3">
          <div className="h-5 w-16 animate-pulse rounded bg-neutral-20" />
        </div>
        <div className="mx-5 border-b border-neutral-30" />
        <div className="px-5 py-3">
          <div className="h-5 w-20 animate-pulse rounded bg-neutral-20" />
        </div>
        <div className="mx-5 border-b border-neutral-30" />
        <div className="px-5 py-3">
          <div className="h-5 w-28 animate-pulse rounded bg-neutral-20" />
        </div>
      </section>

      {/* 정보 및 지원 스켈레톤 */}
      <section className="pt-6">
        <div className="h-7 w-24 animate-pulse rounded bg-neutral-20 px-5 pb-2" />
        <div className="px-5 py-3">
          <div className="h-5 w-16 animate-pulse rounded bg-neutral-20" />
        </div>
        <div className="mx-5 border-b border-neutral-30" />
        <div className="px-5 py-3">
          <div className="h-5 w-16 animate-pulse rounded bg-neutral-20" />
        </div>
      </section>

      {/* 약관 및 정책 스켈레톤 */}
      <section className="pt-6">
        <div className="h-7 w-24 animate-pulse rounded bg-neutral-20 px-5 pb-2" />
        <div className="space-y-1 px-5 py-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="h-5 w-full animate-pulse rounded bg-neutral-20" />
          ))}
        </div>
      </section>

      {/* 하단 버전 + 버튼 스켈레톤 */}
      <div className="mt-auto flex flex-col items-center gap-4 px-5 pb-8 pt-10">
        <div className="h-4 w-12 animate-pulse rounded bg-neutral-20" />
        <div className="h-[67px] w-[228px] animate-pulse rounded-[999px] bg-neutral-20" />
      </div>
    </div>
  );
};
