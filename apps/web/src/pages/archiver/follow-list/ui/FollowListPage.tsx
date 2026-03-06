'use client';

import { useRouter } from 'next/navigation';

import { useGetMyFollows } from '@/entities/archiver/profile/queries/useGetMyFollows';
import { EditorProfileItem } from '@/features/archiver/profile/ui/EditorProfileItem';
import { setArchiverHomeScrollBottomFlag } from '@/shared/constants/archiverHomeScroll';
import { useMinLoading } from '@/shared/hooks/useMinLoading';
import { Button } from '@/shared/ui/button';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';

export interface IEditor {
  editorId: string;
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
}

const SKELETON_ITEMS = [0, 1, 2, 3, 4];

const FollowListSkeleton = () => {
  return (
    <div>
      <div className="flex flex-row justify-between p-5">
        <div className="h-7 w-28 animate-pulse rounded bg-neutral-20" />
      </div>

      {SKELETON_ITEMS.map((index) => (
        <div key={`follow-skeleton-${index}`} className="px-5 py-3">
          <div className="flex gap-5">
            <div className="h-18 w-18 shrink-0 animate-pulse rounded-2xl bg-neutral-20" />
            <div className="flex flex-1 flex-col justify-center gap-2">
              <div className="h-5 w-2/5 animate-pulse rounded bg-neutral-20" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const FollowListPage = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetMyFollows({ useMock: false });
  const showLoading = useMinLoading(isLoading);
  const followData = data?.data?.editors ?? [];

  if (isError) return <ErrorPage />;

  if (showLoading || !data) return <FollowListSkeleton />;

  return (
    <div>
      <div className="flex flex-row justify-between p-5">
        <span className="heading-20-bold">
          에디터 <span className="text-primary-40">{data.data?.editors.length}</span>
        </span>
      </div>
      {followData.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-30 px-5">
          <p className="body-16-semibold text-neutral-40 text-center whitespace-pre-wrap">
            {'팔로우한 에디터가 없어요.\n마음에 드는 에디터를 팔로우해 보세요.'}
          </p>
          <Button
            variant="outlined"
            onClick={() => {
              setArchiverHomeScrollBottomFlag();
              router.push('/archiver/home');
            }}
          >
            팔로우하러가기
          </Button>
        </div>
      ) : (
        followData.map((editor: IEditor) => (
          <EditorProfileItem
            key={editor.editorId}
            editorId={editor.editorId}
            nickname={editor.nickname}
            introduction={editor.introduction}
            profileImageUrl={editor.profileImageUrl}
          />
        ))
      )}
    </div>
  );
};
