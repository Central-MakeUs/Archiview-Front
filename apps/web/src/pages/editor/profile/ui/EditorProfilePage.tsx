'use client';

import { useEditorGetMyProfile } from '@/entities/editor/profile/queries/useEditorGetMyProfile';
import { EditorProfilePageInner } from './EditorProfilePageInner';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

export const EditorProfilePage = () => {
  const { data: editorUserData, isLoading: isEditorUserDataLoading } = useEditorGetMyProfile();

  const showLoading = useMinLoading(isEditorUserDataLoading, 1500);
  if (showLoading) return <LoadingPage text="에디터 프로필을 불러오는 중입니다." role="EDITOR" />;

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
