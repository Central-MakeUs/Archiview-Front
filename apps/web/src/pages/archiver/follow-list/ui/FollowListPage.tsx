'use client';

import { useGetMyFollows } from '@/entities/archiver/profile/queries/useGetMyFollows';
import { EditorProfileItem } from '@/features/archiver/profile/ui/EditorProfileItem';
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

export const FollowListPage = () => {
  const { data, isError } = useGetMyFollows({ useMock: false });
  const followData = data?.data?.editors ?? [];

  if (isError) return <ErrorPage />;

  return (
    <div>
      <div className="flex flex-row justify-between p-5">
        <span className="heading-20-bold">
          에디터 <span className="text-primary-40">{followData.length}</span>
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
