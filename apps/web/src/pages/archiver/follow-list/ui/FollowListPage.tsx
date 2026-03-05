'use client';

import { useGetMyFollows } from '@/entities/archiver/profile/queries/useGetMyFollows';
import { EditorProfileItem } from '@/features/archiver/profile/ui/EditorProfileItem';
import { useMinLoading } from '@/shared/hooks/useMinLoading';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';

export interface IEditor {
  editorId: string;
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
}

export const FollowListPage = () => {
  const { data, isLoading, isError } = useGetMyFollows({ useMock: false });
  const showLoading = useMinLoading(isLoading);
  const followData = data?.data?.editors ?? [];

  if (!data || showLoading)
    return <LoadingPage text="팔로잉 목록을 불러오는 중입니다." role="ARCHIVER" />;

  if (isError) return <ErrorPage />;

  return (
    <div>
      <div className="flex flex-row justify-between p-5">
        <span className="heading-20-bold">
          에디터 <span className="text-primary-40">{data.data?.editors.length}</span>
        </span>
      </div>
      {followData?.map((editor: IEditor) => (
        <EditorProfileItem
          key={editor.editorId}
          editorId={editor.editorId}
          nickname={editor.nickname}
          introduction={editor.introduction}
          profileImageUrl={editor.profileImageUrl}
        />
      ))}
    </div>
  );
};
