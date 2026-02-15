'use client';

import { useGetBlockedEditors } from '@/entities/archiver/follow/queries/useGetBlockedEditors';

import { BlockedEditorProfileItem } from './BlockedEditorProfileItem';

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
  const { data, isLoading, isError, error } = useGetBlockedEditors({ useMock: true });

  const blockedEditors = data?.data?.editors ?? [];

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러: {(error as Error)?.message ?? '알 수 없는 오류'}</div>;

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
