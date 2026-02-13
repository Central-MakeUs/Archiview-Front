'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { Item } from '@/shared/ui/common/Item';
import { RightArrowIcon, ProfileDeleteIcon } from '@/shared/ui/icon';
import { FollowDeleteModal } from '@/entities/archiver/profile/ui/FollowDeleteModal';
import { useUnfollowEditor } from '@/entities/archiver/follow/mutation/useUnFollowEditor';

interface IEditorProfileItemProps {
  editorId: string;
  nickname: string;
  introduction: string;
  profileImageUrl: string;
}

export const EditorProfileItem = ({
  editorId,
  nickname,
  introduction,
  profileImageUrl,
}: IEditorProfileItemProps): React.ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const { unfollowEditor } = useUnfollowEditor();

  return (
    <div>
      <Item
        onClick={() => console.log('에디터 프로필 클릭')}
        thumbnail={
          <div className="relative h-18 w-18 rounded-2xl overflow-hidden bg-neutral-30">
            <Image src={profileImageUrl} alt={`${nickname} 프로필`} fill className="object-cover" />
          </div>
        }
        className="group gap-5"
      >
        <div className="flex items-center justify-between">
          {/* 텍스트 영역 */}
          <div className="w-full">
            <div className="flex flex-row w-full justify-between items-center body-18-semibold text-neutral-90">
              <span className="group-active:text-primary-40">{nickname}</span>
              <div className="flex flex-row gap-1">
                <div className="p-1.5">
                  <RightArrowIcon
                    onClick={() => console.log('클릭')}
                    className="group-active:text-primary-40"
                  />
                </div>
                <div className="p-1">
                  {/* TODO : ProfileDeleteIcon 눌렀을 땐 다른 active css 동작 안시키고 싶은데 어떻게? */}
                  <ProfileDeleteIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalOpen(true);
                    }}
                    className="active:text-primary-40"
                  />
                </div>
              </div>
            </div>
            <div className="mt-1 body-14-regular text-neutral-50">{introduction}</div>
          </div>
        </div>
      </Item>
      {/* TODO : 팔로우 해제 연동하기 */}
      <FollowDeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          unfollowEditor(editorId);
          setModalOpen(false);
        }}
      />
    </div>
  );
};
