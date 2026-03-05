'use client';

import { useEditorGetMyProfile } from '@/entities/editor/profile/queries/useEditorGetMyProfile';
import { EditorProfilePageInner } from './EditorProfilePageInner';
import { useMinLoading } from '@/shared/hooks/useMinLoading';

export const EditorProfilePage = () => {
  const { data: editorUserData, isLoading: isEditorUserDataLoading } = useEditorGetMyProfile();

  const showLoading = useMinLoading(isEditorUserDataLoading, 1500);
  if (showLoading) return null;

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
