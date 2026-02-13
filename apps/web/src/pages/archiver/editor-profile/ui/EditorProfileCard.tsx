import Image from 'next/image';
import { useState } from 'react';

import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/common/Card';
import { DotThreeIcon, ProfileAddIcon } from '@/shared/ui/icon';
import { useFollowEditor } from '@/entities/archiver/follow/mutation/useFollowEditor';

import { ReportBottomSheetModal } from './ReportBottomSheetModal';
import { ReportModal, BlockModal } from './ReportModal';

interface IEditorProfile {
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
}

interface IEditorProfileCardProps {
  editorId: string;
  editorData: IEditorProfile;
}

export const EditorProfileCard = ({ editorId, editorData }: IEditorProfileCardProps) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const { followEditor } = useFollowEditor();

  const stripHash = (tag?: string) => (tag ?? '').trim().replace(/^#/, '');

  return (
    <>
      <Card className="bg-primary-30 overflow-hidden border-none shadow-default">
        {/* 상단(블루 영역) */}

        <div className="flex flex-row w-full gap-4 p-5">
          {/* 프로필 이미지 */}
          <div className="shrink-0">
            <div className="relative overflow-hidden h-17.5 w-17.5 rounded-full bg-neutral-30">
              <Image src={editorData.profileImageUrl} alt="" fill />
            </div>
          </div>

          {/* 텍스트 + 배지 */}
          <div className="flex flex-col flex-1">
            <div className="flex flex-row w-full items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="heading-20-bold leading-none text-primary-50">
                  {editorData.nickname}
                </div>
                <div className="body-14-semibold text-primary-10">@{editorData.instagramId}</div>
              </div>

              {/* 우측 아이콘 버튼들 */}
              <div className="shrink-0 flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(
                      `https://www.instagram.com/${editorData.instagramId}`,
                      '_blank',
                      'noopener,noreferrer',
                    );
                  }}
                  className="inline-flex items-center justify-center"
                >
                  <Image
                    src="/images/instagramColoredIcon.svg"
                    alt="인스타 아이콘"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </button>

                {/* TODO : 친추완료 시 아이콘 바꾸기 */}
                <button
                  type="button"
                  onClick={() => followEditor(editorId)}
                  className="inline-flex items-center justify-center"
                >
                  <ProfileAddIcon className="text-black" />
                </button>

                <DotThreeIcon
                  className="text-black"
                  onClick={() => {
                    setBottomSheetOpen(true);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row gap-1 mt-2">
              <Badge variant="contained" className="bg-white text-primary-30 rounded-xl">
                {stripHash(editorData.hashtags[0])}
              </Badge>
              <Badge variant="contained" className="bg-white text-primary-30 rounded-xl">
                {stripHash(editorData.hashtags[1])}
              </Badge>
            </div>
          </div>
        </div>

        {/* 하단(화이트 영역) */}
        <div className="bg-white px-5 pb-5 pt-4">
          <p className="body-14-medium text-primary-40">
            50자 이내로 자기소개합니다. 50자 이내로 자기소개합니다. 50자 이내로 자기소개합니다.
          </p>
        </div>
      </Card>

      {bottomSheetOpen && (
        <ReportBottomSheetModal
          open={bottomSheetOpen}
          setOpen={setBottomSheetOpen}
          setReportModalOpen={setReportModalOpen}
        />
      )}

      <ReportModal
        isOpen={reportModalOpen}
        onCancel={() => {
          setReportModalOpen(false);
        }}
        // TODO : api 연동하기
        onConfirm={() => {
          setReportModalOpen(false);
        }}
      />
      <BlockModal
        isOpen={reportModalOpen}
        onCancel={() => {
          setReportModalOpen(false);
        }}
        // TODO : api 연동하기
        onConfirm={() => {
          setReportModalOpen(false);
        }}
        editorName={'에디터 닉네임'}
      />
    </>
  );
};
