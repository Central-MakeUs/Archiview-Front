import Image from 'next/image';
import { useState } from 'react';

import { Chip } from '@/shared/ui/Chip';
import { FolderIcon } from '@/shared/ui/icon';
import { usePostPlaceCardMutation } from '@/entities/archiver/place/mutation/usePostPlaceCard';

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
}

export const CardSection = ({
  postPlaces,
  placeName,
}: {
  postPlaces?: IPostPlace[];
  placeName?: string;
}) => {
  const [openPlaceFinishModal, setOpenPlaceFinishModal] = useState(false);

  const { postPlaceCard } = usePostPlaceCardMutation({
    onSuccess: () => setOpenPlaceFinishModal(true),
  });

  const onFolderClick = (postPlaceId: number) => {
    postPlaceCard({ postPlaceId });
  };

  return (
    <section className="p-5 flex flex-col gap-4">
      {postPlaces?.map((post) => (
        <>
          <ArchivePlaceFinishModal
            editor={post.editorName}
            place={placeName ?? ''}
            isOpen={openPlaceFinishModal}
            onClose={() => setOpenPlaceFinishModal(false)}
            onConfirm={() => console.log('확ㄴ인')}
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
              />
            </div>
            <div className="rounded-r-default bg-[#F7F7F8] w-full flex flex-col gap-1 py-3 pl-3 pr-5">
              <div className="flex justify-between pb-3 border-b border-neutral-30">
                <div className="body-14-pretendard">
                  {post.editorName}
                  <p className="caption-12-semibold text-neutral-50">@ {post.editorInstagramId}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => onFolderClick(post.postPlaceId)}>
                    <FolderIcon />
                  </button>
                  <button>
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
                <Chip label="카페" className="bg-primary-40 text-neutral-10 border-none" />
                <Chip label="커피맛집" className="bg-primary-10 text-primary-40 border-none" />
                <Chip label="카페맛집" className="bg-primary-10 text-primary-40 border-none" />
              </div>
            </div>
          </div>
        </>
      ))}
    </section>
  );
};
