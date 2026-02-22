import { useState } from 'react';

import { usePostPlaceCardMutation } from '@/entities/archiver/place/mutation/usePostPlaceCard';
import { useDeletePlaceCardMutation } from '@/entities/archiver/place/mutation/useDeletePlaceCard';
import { useReportPostPlace } from '@/entities/archiver/report/mutation/useReportPostPlace';

import { ReportEditorCardModal } from './ReportEditorCardModal';
import { ArchivePlaceFinishModal } from './ArchivePlaceFinishModal';
import { CardSectionItem, type IPostPlace } from './CardSectionItem';

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
      <ReportEditorCardModal
        isOpen={openReportModal}
        onCancel={() => {
          setOpenReportModal(false);
          setSelectedReportPostPlaceId(null);
        }}
        // TODO : api 연동하기
        onConfirm={onConfirmReport}
      />
      {postPlaces?.map((post) => (
        <CardSectionItem
          key={post.postPlaceId}
          post={post}
          onFolderClick={onFolderClick}
          onClickReport={onClickReport}
        />
      ))}
    </section>
  );
};
