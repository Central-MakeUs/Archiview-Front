'use client';

import { useEditorGetMyProfile } from '@/entities/editor/profile/queries/useEditorGetMyProfile';
import { EditorProfilePageInner } from './EditorProfilePageInner';

export const EditorProfilePage = () => {
  const { data: editorUserData } = useEditorGetMyProfile();

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
