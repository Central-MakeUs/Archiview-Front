'use client';

import React, { useState } from 'react';

import { Item } from '@/shared/ui/common/Item';
import { RightArrowIcon, ProfileDeleteIcon } from '@/shared/ui/icon';

import { FollowDeleteModal } from './FollowDeleteModal';

export const EditorProfileItem = (): React.ReactElement => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <div>
      <Item
        onClick={() => console.log('에디터 프로필 클릭')}
        thumbnail={<div className="h-18 w-18 rounded-2xl bg-neutral-30" />}
        className="group gap-5"
      >
        <div className="flex items-center justify-between">
          {/* 텍스트 영역 */}
          <div className="w-full">
            <div className="flex flex-row w-full justify-between items-center body-18-semibold text-neutral-90">
              <span className="group-active:text-primary-40">에디터 닉네임</span>
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
                      console.log('클릭');
                      setModalOpen(true);
                    }}
                    className="active:text-primary-40"
                  />
                </div>
              </div>
            </div>
            <div className="mt-1 body-14-regular text-neutral-50">에디터의 한줄소개</div>
          </div>
        </div>
      </Item>
      <FollowDeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
};
