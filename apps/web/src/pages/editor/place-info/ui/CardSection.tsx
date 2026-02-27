import Image from 'next/image';
import { useMemo } from 'react';

import { Chip } from '@/shared/ui/Chip';
import { IEditorInsightPlaceDetail } from '@/entities/editor/place/model/editorPlace.type';
import { PencilIcon } from '@/shared/ui/icon/place-info/PencilIcon';
import { useRouter } from 'next/navigation';
import { openInstagramUrlDeepLinkOrPopup } from '@/shared/lib/external/openInstagramUrl.client';
import { usePostInstagramFlow } from '@/entities/archiver/place/mutation/usePostInstagramFlow';

const getVisibleHashTags = (hashTags: string[]) => {
  if (hashTags.length <= 2) {
    return hashTags;
  }

  const hiddenIndex = Math.floor(Math.random() * 3);
  return hashTags.filter((_, index) => index !== hiddenIndex);
};

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
  const visibleHashTagsByPostId = useMemo(
    () =>
      new Map(
        (postPlaces ?? []).map((post) => [post.postPlaceId, getVisibleHashTags(post.postHashTags)]),
      ),
    [postPlaces],
  );

  return (
    <section className="p-5 flex flex-col gap-4">
      {postPlaces?.map((post) => (
        <div key={post.postPlaceId} className="flex h-31.75">
          <div className="rounded-l-default bg-neutral-40 w-20 relative overflow-hidden">
            <img alt="썸네일" src={post.imageUrl} className="w-full h-full object-cover" />
          </div>
          <div className="rounded-r-default bg-[#F7F7F8] w-full flex flex-col min-h-0 py-3 pl-3 pr-5">
            <div className="flex justify-between pb-3 border-b border-neutral-30 shrink-0">
              <div className="body-14-pretendard">
                {post.editorName}
                <p className="caption-12-semibold text-neutral-50">@ {post.editorInstagramId}</p>
              </div>
              <div className="caption-12-regular text-neutral-50">{post.description}</div>
              <div className="flex gap-1">
                {(visibleHashTagsByPostId.get(post.postPlaceId) ?? []).map((hashTag, index) => (
                  <Chip
                    key={`${post.postPlaceId}-${hashTag}-${index}`}
                    label={hashTag}
                    className={
                      index === 0
                        ? 'bg-primary-40 text-neutral-10 border-none caption-12-medium'
                        : 'bg-primary-10 text-primary-40 border-none caption-12-medium'
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-0 caption-12-regular text-neutral-50 overflow-hidden">
              {post.description}
            </div>
            <div className="flex gap-1 mt-auto pt-2 shrink-0">
              {post.postHashTags.map((tag, index) => (
                <Chip
                  key={tag}
                  label={tag}
                  className={`border-none ${index >= 1 ? 'bg-primary-10 text-primary-40' : 'bg-primary-40 text-neutral-10'}`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
