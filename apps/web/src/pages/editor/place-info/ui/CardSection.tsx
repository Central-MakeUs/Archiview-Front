import Image from 'next/image';

import { Chip } from '@/shared/ui/Chip';
import { IEditorInsightPlaceDetail } from '@/entities/editor/place/model/editorPlace.type';
import { PencilIcon } from '@/shared/ui/icon/place-info/PencilIcon';
import { useRouter } from 'next/navigation';
import { openInstagramUrlDeepLinkOrPopup } from '@/shared/lib/external/openInstagramUrl.client';
import { usePostInstagramFlow } from '@/entities/archiver/place/mutation/usePostInstagramFlow';

export const CardSection = ({
  postPlaces,
  placeName,
  placeId,
}: {
  postPlaces?: IEditorInsightPlaceDetail['postPlaces'];
  placeName?: string;
  placeId: number;
}) => {
  const router = useRouter();

  const { mutate: postInstagramFlow } = usePostInstagramFlow();

  return (
    <section className="p-5 flex flex-col gap-4">
      {postPlaces?.map((post) => (
        <div key={post.postPlaceId} className="flex h-31.75">
          <div className="rounded-l-default bg-neutral-40 w-20 relative overflow-hidden">
            <img alt="썸네일" src={post.imageUrl} className="w-full h-full object-cover" />
          </div>
          <div className="rounded-r-default bg-[#F7F7F8] w-full flex flex-col gap-1 py-3 pl-3 pr-5">
            <div className="flex justify-between pb-3 border-b border-neutral-30">
              <div className="body-14-pretendard">
                {post.editorName}
                <p className="caption-12-semibold text-neutral-50">@ {post.editorInstagramId}</p>
              </div>
              <div className="flex gap-1">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    openInstagramUrlDeepLinkOrPopup(post.postUrl);
                    postInstagramFlow(post.postPlaceId);
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
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/editor/register-place?postPlaceId=${post.postPlaceId}`)
                  }
                >
                  <PencilIcon />
                </button>
              </div>
            </div>
            <div className="caption-12-regular text-neutral-50">{post.description}</div>
            <div className="flex gap-1">
              <Chip
                label={Array.isArray(post.postHashTags) ? (post.postHashTags[0] ?? '') : '#테스트'}
                className="bg-primary-40 text-neutral-10 border-none"
              />
              <Chip
                label={Array.isArray(post.postHashTags) ? (post.postHashTags[1] ?? '') : '#테스트'}
                className="bg-primary-10 text-primary-40 border-none"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
