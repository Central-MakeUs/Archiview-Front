import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Chip } from '@/shared/ui/Chip';
import { FolderIcon } from '@/shared/ui/icon';
import { usePostPlaceCardMutation } from '@/entities/archiver/place/mutation/usePostPlaceCard';
import { useDeletePlaceCardMutation } from '@/entities/archiver/place/mutation/useDeletePlaceCard';
import { useReportPostPlace } from '@/entities/archiver/report/mutation/useReportPostPlace';
import { openInstagramUrlDeepLinkOrPopup } from '@/shared/lib/external/openInstagramUrl.client';

import { ReportEditorCardModal } from './ReportEditorCardModal';
import { ArchivePlaceFinishModal } from './ArchivePlaceFinishModal';
interface IPostPlace {
  postPlaceId: number;
  postId: number;
  instagramUrl: string;
  hashTags: string[];
  description: string;
  imageUrl: string;
  categoryNames: string[];
  editorName: string;
  editorInstagramId: string;
  isArchived: boolean; // 안씀
}

export const CardSection = ({
  postPlaces,
  placeName,
  placeId,
}: {
  postPlaces?: IPostPlace[];
  placeName?: string;
  placeId: number;
}) => {
  const [openPlaceFinishModal, setOpenPlaceFinishModal] = useState(false);
  const [placeFinishModalType, setPlaceFinishModalType] = useState<'archive' | 'unarchive'>(
    'archive',
  );
  const [placeFinishModalEditor, setPlaceFinishModalEditor] = useState('');
  const [openReportModal, setOpenReportModal] = useState(false);
  const [selectedReportPostPlaceId, setSelectedReportPostPlaceId] = useState<number | null>(null);

  const { postPlaceCard } = usePostPlaceCardMutation({
    onSuccess: () => setOpenPlaceFinishModal(true),
  });

  const { deletePlaceCard } = useDeletePlaceCardMutation({
    onSuccess: () => setOpenPlaceFinishModal(true),
  });

  const { reportPostPlace } = useReportPostPlace({
    onSuccess: () => {
      setOpenReportModal(false);
      setSelectedReportPostPlaceId(null);
    },
  });

  const onClickReport = (postPlaceId: number) => {
    setSelectedReportPostPlaceId(postPlaceId);
    setOpenReportModal(true);
  };

  const onConfirmReport = () => {
    if (!selectedReportPostPlaceId) return;
    reportPostPlace({ postPlaceId: selectedReportPostPlaceId });
  };

  const onFolderClick = (postPlaceId: number, isArchived: boolean, editorName: string) => {
    setPlaceFinishModalType(isArchived ? 'unarchive' : 'archive');
    setPlaceFinishModalEditor(editorName);

    if (isArchived) {
      deletePlaceCard({ postPlaceId, placeId, useMock: false });
      return;
    }

    postPlaceCard({ postPlaceId, placeId, useMock: false });
  };

  return (
    <section className="p-5 flex flex-col gap-4">
      <ArchivePlaceFinishModal
        editor={placeFinishModalEditor}
        place={placeName ?? ''}
        type={placeFinishModalType}
        isOpen={openPlaceFinishModal}
        onClose={() => setOpenPlaceFinishModal(false)}
        onConfirm={() => setOpenPlaceFinishModal(false)}
      />
      {postPlaces?.map((post) => (
        <div key={post.postId}>
          <ReportEditorCardModal
            isOpen={openReportModal}
            onCancel={() => {
              setOpenReportModal(false);
              setSelectedReportPostPlaceId(null);
            }}
            // TODO : api 연동하기
            onConfirm={onConfirmReport}
          />

          <div key={post.postId} className="flex h-31.75">
            <div className="rounded-l-default bg-neutral-40 w-20 relative overflow-hidden">
              <Image
                alt="썸네일"
                src={post.imageUrl}
                fill
                className="object-cover"
                sizes="80px"
                priority={false}
                unoptimized
              />
            </div>
            <div className="rounded-r-default bg-[#F7F7F8] w-full flex flex-col gap-1 py-3 pl-3 pr-5">
              <div className="flex justify-between pb-3 border-b border-neutral-30">
                <div className="body-14-pretendard">
                  {post.editorName}
                  <p className="caption-12-semibold text-neutral-50">@ {post.editorInstagramId}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      onFolderClick(post.postPlaceId, post.isArchived, post.editorName)
                    }
                  >
                    <FolderIcon active={post.isArchived} />
                  </button>
                  <button
                    onClick={() => {
                      openInstagramUrlDeepLinkOrPopup(post.instagramUrl);
                    }}
                  >
                    <Image
                      src="/images/instagramColoredIcon.svg"
                      alt="인스타 아이콘"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </div>
              <div className="caption-12-regular text-neutral-50">{post.description}</div>
              <div className="flex gap-1">
                {post.hashTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    className="bg-primary-40 text-neutral-10 border-none"
                  />
                ))}
                <button
                  type="button"
                  className="ml-auto caption-12-regular text-neutral-50"
                  onClick={() => onClickReport(post.postPlaceId)}
                >
                  신고하기
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
