'use client';

import { useGetMyFollows } from '@/entities/archiver/profile/queries/useGetMyFollows';
// import { IEditor } from '@/entities/archiver/profile/model/archiverProfile.type';
import { EditorProfileItem } from '@/features/archiver/profile/ui/EditorProfileItem';
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
  const { data, isLoading, isError } = useGetMyFollows({ useMock: true });
  const followData = data?.data?.editors ?? [];

  if (!data || isLoading) return <div className="mb-5">로딩중...</div>;

  if (isError) return <div className="mb-5">에러</div>;

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
          nickname={editor.nickname}
          introduction={editor.introduction}
          profileImageUrl={editor.profileImageUrl}
        />
      ))}
    </div>
  );
};
