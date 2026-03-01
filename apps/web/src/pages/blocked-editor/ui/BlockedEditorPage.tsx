'use client';

import { useGetBlockedEditors } from '@/entities/archiver/follow/queries/useGetBlockedEditors';

import { BlockedEditorProfileItem } from './BlockedEditorProfileItem';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';

export interface IBlockedEditor {
  editorId: string;
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
  blockedAt: string;
}

export interface IBlockedEditorResponse {
  totalCount: number;
  editors: IBlockedEditor[];
}

export const BlockedEditorPage = () => {
  const { data, isLoading, isError, error } = useGetBlockedEditors({ useMock: false });

  const blockedEditors = data?.data?.editors ?? [];

  if (isLoading) return <LoadingPage text="차단된 에디터를 불러오는 중입니다." role="ARCHIVER" />;
  if (isError) return <ErrorPage />;

  console.log(data?.data?.editors);
  return (
    <div>
      {blockedEditors?.map((editor: IBlockedEditor) => (
        <BlockedEditorProfileItem
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
