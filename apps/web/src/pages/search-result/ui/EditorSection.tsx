'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CaretRightIcon, RightArrowIcon } from '@/shared/ui/icon';
import { Item } from '@/shared/ui/common/Item';
import type { IEditor } from '@/entities/archiver/search/model/archiverSearch.type';
import { UserPlusIcon } from '@/shared/ui/icon/UserPlusIcon';
import { useFollowEditor } from '@/entities/archiver/follow/mutation/useFollowEditor';
import { FollowModal } from '@/pages/archiver/editor-profile/ui/FollowModal';
import { archiverKeys } from '@/shared/lib/query-keys';
import { useQueryClient } from '@tanstack/react-query';

const MAX_PREVIEW_ITEMS = 3;

interface IEditorSectionProps {
  editors: IEditor[];
  hasMoreEditors?: boolean;
  onMoreClick?: () => void;
  showPreview?: boolean;
  searchTerm?: string;
}

export const EditorSection = ({
  editors,
  hasMoreEditors = false,
  onMoreClick,
  showPreview = false,
  searchTerm = '',
}: IEditorSectionProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [followModalOpen, setFollowModalOpen] = useState(false);
  const [selectedEditor, setSelectedEditor] = useState<IEditor | null>(null);

  const { followEditor } = useFollowEditor({
    onSuccess: async () => {
      if (searchTerm) {
        await queryClient.invalidateQueries({
          queryKey: archiverKeys.getSearch.applyFilters({ search: searchTerm }).queryKey,
        });
      }
    },
  });

  const displayEditors = showPreview ? editors.slice(0, MAX_PREVIEW_ITEMS) : editors;

  return (
    <div className="flex flex-col gap-[20px] px-[20px]">
      <span className="body-18-bold">에디터</span>
      <div className="flex flex-col gap-[6px]">
        <div className="flex flex-col rounded-2xl overflow-hidden bg-white">
          {displayEditors.map((editor) => (
          <Item
            key={editor.editorId}
            thumbnail={
              <div className="relative h-18 w-18 rounded-2xl overflow-hidden bg-neutral-30 shrink-0">
                <Image
                  src={editor.profileImageUrl}
                  alt={`${editor.nickname} 프로필`}
                  fill
                  className="object-cover"
                />
              </div>
            }
            onClick={() => router.push(`/archiver/editor-profile/${editor.editorId}`)}
          >
            <div className="flex flex-col pl-2 min-w-0">
              <p className="body-16-semibold flex flex-row items-center justify-between">
                <span className="truncate">{editor.nickname}</span>
                <span className="flex items-center gap-1">
                  <RightArrowIcon />
                  {!editor.following && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedEditor(editor);
                        setFollowModalOpen(true);
                      }}
                      className="inline-flex items-center justify-center"
                    >
                      <UserPlusIcon />
                    </button>
                  )}
                </span>
              </p>
              <p className="body-14-regular text-neutral-50 truncate pt-1">{editor.introduction}</p>
            </div>
          </Item>
          ))}
        </div>
        {showPreview && onMoreClick && editors.length >= 1 && (
          <div className="flex justify-end">
          <button
            type="button"
            onClick={onMoreClick}
            className="flex items-center gap-1 body-14-semibold text-primary-40 underline"
          >
            에디터 더보기
            <CaretRightIcon className="w-4 h-4 [&_path]:stroke-[var(--color-primary-40)]" />
          </button>
          </div>
        )}
      </div>

      {selectedEditor && (
        <FollowModal
          nickname={selectedEditor.nickname}
          isOpen={followModalOpen}
          onClose={() => {
            setFollowModalOpen(false);
            setSelectedEditor(null);
          }}
          onConfirm={() => {
            setFollowModalOpen(false);
            followEditor(selectedEditor.editorId);
            setSelectedEditor(null);
          }}
        />
      )}
    </div>
  );
};
