'use client';

import { useState } from 'react';

import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';

import { EditorPlaceItem } from '../../../../entities/editor/place/ui/EditorPlaceItem';

import { CategoryOptionTabs, type CategoryTab } from '../CategoryOptionTabs';
import { HamburgerIcon } from '@/shared/ui/icon/HamburgerIcon';
import { EditorProfileCard } from './EditorProfileCard';

import type { IEditorInsightPlace } from '@/entities/editor/place/model/editorPlace.type';
import { useRouter } from 'next/navigation';

interface IEditorProfile {
  nickname: string;
  instagramId?: string;
  introduction?: string;
  hashtags?: string[];
  profileImageUrl?: string;
}

export const EditorProfilePageInner = ({
  places,
  profile,
}: {
  places: IEditorInsightPlace[];
  profile: IEditorProfile;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryTab>('전체');

  const handleEditProfile = () => {
    router.push('/mypage/edit-profile');
  };

  const handleShareInfo = () => {
    router.push('/editor/register-place');
  };

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="pt-3 pb-6">
        <EditorProfileCard
          nickname={profile.nickname}
          instagramId={profile.instagramId}
          introduction={profile.introduction}
          hashtags={profile.hashtags}
          profileImageUrl={profile.profileImageUrl}
          onEdit={handleEditProfile}
          onShareInfo={handleShareInfo}
        />
      </div>

      <CategoryOptionTabs value={category} onChange={setCategory} />

      <div className="flex-1 min-h-0 pt-6">
        <KakaoMap
          lat={37.5665}
          lng={126.978}
          level={3}
          // TODO: 마커
        />

        <BottomSheet isOpen={open} onOpenChange={setOpen} height={500} peekHeight={72}>
          <div className="px-5 pb-6">
            <div className="flex flex-row justify-between pb-4 pt-2.5">
              <p className="heading-20-bold">
                업로드한 장소 <span className="text-primary-40 pl-1">{places.length}</span>
              </p>
              <HamburgerIcon />
            </div>
            {places.map((place) => (
              <EditorPlaceItem
                key={place.placeId}
                placeId={place.placeId}
                name={place.placeName}
                description={place.editorSummary}
                savedCount={place.stats.saveCount}
                viewCount={place.stats.viewCount}
                shareCount={place.stats.directionCount}
                instagramCount={place.stats.instagramInflowCount}
                thumbnail={
                  place.placeImageUrl ? (
                    <img
                      src={place.placeImageUrl}
                      alt={place.placeName}
                      className="h-18 w-18 rounded-2xl object-cover"
                    />
                  ) : undefined
                }
              />
            ))}
          </div>
        </BottomSheet>
      </div>
    </div>
  );
};
