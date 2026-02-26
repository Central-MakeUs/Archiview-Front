'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CaretRightIcon, RightArrowIcon } from '@/shared/ui/icon';
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
    <div className="flex flex-col gap-[20px] w-full">
      <span className="body-18-bold px-[20px]">에디터</span>
      <div className="flex flex-col gap-[6px] w-full">
        <div className="flex flex-col w-full bg-transparent">
          {displayEditors.map((editor) => (
            <div
              key={editor.editorId}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/archiver/editor-profile/${editor.editorId}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/archiver/editor-profile/${editor.editorId}`);
                }
              }}
              className="flex w-full items-center p-5 cursor-pointer bg-transparent border-b border-primary-10"
            >
              <div className="shrink-0">
                <div className="relative h-18 w-18 overflow-hidden rounded-2xl bg-neutral-20">
                  <Image
                    src={editor.profileImageUrl}
                    alt={`${editor.nickname} 프로필`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col pl-2 min-w-0 flex-1 overflow-hidden">
                <p className="body-16-semibold flex flex-row items-center justify-between gap-2">
                  <span className="truncate min-w-0">{editor.nickname}</span>
                  <span className="flex items-center gap-1 shrink-0">
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
                <p className="body-14-regular text-neutral-50 truncate pt-1">
                  {editor.introduction}
                </p>
              </div>
            </div>
          ))}
        </div>
        {showPreview && onMoreClick && editors.length > 3 && (
          <div className="flex justify-end px-[20px]">
            <button
              type="button"
              onClick={onMoreClick}
              className="flex items-center gap-1 body-14-semibold text-primary-40 underline"
            >
              에디터 더 보기
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
