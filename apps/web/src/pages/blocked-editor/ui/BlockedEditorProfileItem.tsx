'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { Item } from '@/shared/ui/common/Item';
import { UnBlockIcon } from '@/shared/ui/icon';
import { useUnBlockEditor } from '@/entities/archiver/follow/mutation/useUnblockEditor';

import { UnBlockModal } from './UnBlockModal';

interface IBlockedEditorProfileItemProps {
  editorId: string;
  nickname: string;
  introduction: string;
  profileImageUrl: string;
}

export const BlockedEditorProfileItem = ({
  editorId,
  nickname,
  introduction,
  profileImageUrl,
}: IBlockedEditorProfileItemProps): React.ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);

  const { unBlockEditor } = useUnBlockEditor({
    useMock: false,
    onSuccess: () => setModalOpen(false),
  });

  return (
    <div>
      <Item
        thumbnail={
          <div className="relative h-18 w-18 rounded-2xl overflow-hidden bg-neutral-30">
            <Image src={profileImageUrl} alt={`${nickname} 프로필`} fill className="object-cover" />
          </div>
        }
        disableActive
        className="group gap-5"
      >
        <div className="flex items-center justify-between">
          {/* 텍스트 영역 */}
          <div className="w-full">
            <div className="flex flex-row w-full justify-between items-center body-18-semibold text-neutral-90">
              <span>{nickname}</span>
              <div className="flex flex-row gap-1">
                <div className="p-1.5">
                  {/* <RightArrowIcon
                    onClick={() => console.log('클릭')}
                    className="group-active:text-primary-40"
                  /> */}
                </div>
                <div className="p-1">
                  {/* TODO : ProfileDeleteIcon 눌렀을 땐 다른 active css 동작 안시키고 싶은데 어떻게? */}
                  <UnBlockIcon
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
      <UnBlockModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => unBlockEditor(editorId)}
      />
    </div>
  );
};
