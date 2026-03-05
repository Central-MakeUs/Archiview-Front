'use client';

import { useEditorGetMyProfile } from '@/entities/editor/profile/queries/useEditorGetMyProfile';
import { EditorProfilePageInner } from './EditorProfilePageInner';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

const PROFILE_SKELETON_TAGS = [0, 1, 2];

const EditorProfilePageSkeleton = () => {
  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="mx-5 mt-1 overflow-hidden rounded-default shadow-[0px_0px_11px_0px_rgba(144,144,144,0.4)]">
        <div className="bg-primary-20 p-5">
          <div className="flex items-center gap-4">
            <div className="size-[70px] shrink-0 animate-pulse rounded-full bg-neutral-10" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-7 w-1/2 animate-pulse rounded bg-neutral-10" />
              <div className="h-5 w-2/5 animate-pulse rounded bg-neutral-10" />
            </div>
          </div>
          <div className="mt-4 h-4 w-4/5 animate-pulse rounded bg-neutral-10" />
          <div className="mt-3 flex gap-1">
            {PROFILE_SKELETON_TAGS.map((index) => (
              <div
                key={`editor-profile-tag-skeleton-${index}`}
                className="h-7 w-14 animate-pulse rounded-xl bg-neutral-10"
              />
            ))}
          </div>
        </div>
        <div className="bg-neutral-10 px-5 pb-5 pt-4">
          <div className="h-10 w-full animate-pulse rounded-xl bg-neutral-20" />
        </div>
      </div>

      <div className="px-5 pt-4">
        <div className="h-10 w-full animate-pulse rounded-xl bg-neutral-20" />
      </div>

      <div className="flex-1 min-h-0 pt-4">
        <div className="relative h-full w-full overflow-hidden">
          <div className="h-full w-full animate-pulse bg-neutral-20" />
          <div className="absolute left-1/4 top-1/3 h-4 w-4 animate-pulse rounded-full bg-neutral-10" />
          <div className="absolute right-1/3 top-1/2 h-3 w-3 animate-pulse rounded-full bg-neutral-10" />
          <div className="absolute bottom-4 left-0 right-0 rounded-t-3xl bg-neutral-10/90 px-5 pb-5 pt-4">
            <div className="h-6 w-28 animate-pulse rounded bg-neutral-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditorProfilePage = () => {
  const { data: editorUserData, isLoading: isEditorUserDataLoading } = useEditorGetMyProfile();

  const showLoading = useMinLoading(isEditorUserDataLoading, 1500);
  if (showLoading || !editorUserData) return <EditorProfilePageSkeleton />;

  const profile = {
    nickname: editorUserData?.data?.nickname ?? '',
    instagramId: editorUserData?.data?.instagramId ?? '',
    introduction: editorUserData?.data?.introduction ?? '',
    hashtags: editorUserData?.data?.hashtags ?? [],
    profileImageUrl: editorUserData?.data?.profileImageUrl ?? '',
  };

  return (
    <div className="flex h-full flex-col">
      <EditorProfilePageInner profile={profile} />
    </div>
  );
};
