'use client';

import { useState, useCallback } from 'react';
import { useEditorCreatePost } from '@/entities/editor/place/mutations/useEditorCreatePost';
import { IPlaceInfoRequest } from '@/entities/editor/place/model/editorPlace.type';
import { HashTagInput } from './ui/HashTagInput';
import { InstagramUrlInput } from './ui/InstagramUrlInput';
import { RegisterPlaceCard, IRegisterPlaceCardValue } from './ui/RegisterPlaceCard';

const createDefaultPlace = (): IRegisterPlaceCardValue => ({
  placeName: '',
  description: '',
  addressName: '',
  roadAddressName: '',
  latitude: 0,
  longitude: 0,
  categoryIds: [],
  nearestStationWalkTime: '',
  placeUrl: '',
  phoneNumber: '',
  imageUrl: '',
});

export const RegisterPlacePage = () => {
  const [instagramUrl, setInstagramUrl] = useState('');
  const [hashTag, setHashTag] = useState<string[]>([]);
  const [placeInfos, setPlaceInfos] = useState<IRegisterPlaceCardValue[]>([createDefaultPlace()]);
  const { createEditorPost } = useEditorCreatePost();

  const handleAddPlace = () => {
    setPlaceInfos((prev) => [...prev, createDefaultPlace()]);
  };

  const handlePlaceChange = useCallback((index: number, item: IRegisterPlaceCardValue) => {
    setPlaceInfos((prev) => {
      const next = [...prev];
      next[index] = item;
      return next;
    });
  }, []);

  const handleSubmit = () => {
    const placeInfoRequestList: IPlaceInfoRequest[] = placeInfos.map((place) => ({
      placeName: place.placeName,
      name: place.placeName || place.addressName || '장소',
      description: place.description ?? '',
      addressName: place.addressName,
      roadAddressName: place.roadAddressName,
      latitude: place.latitude,
      longitude: place.longitude,
      categoryIds: place.categoryIds,
      nearestStationWalkTime: place.nearestStationWalkTime,
      placeUrl: place.placeUrl,
      phoneNumber: place.phoneNumber,
      imageUrl: place.imageUrl,
    }));

    createEditorPost({
      url: instagramUrl,
      hashTags: hashTag,
      placeInfoRequestList,
    });
  };

  return (
    <div className="px-5">
      <InstagramUrlInput className="pt-2.5 pb-8" value={instagramUrl} onChange={setInstagramUrl} />
      <div className="-mx-5 border-b border-neutral-30" />
      <HashTagInput className="pt-4 pb-8" value={hashTag} onChange={setHashTag} />
      <div className="-mx-5 border-b border-neutral-30" />
      <div className="-mx-5 py-8 bg-neutral-20">
        <div className="px-5 flex flex-col gap-4">
          {placeInfos.map((placeInfo, index) => (
            <RegisterPlaceCard
              key={index}
              placeIndex={index + 1}
              value={placeInfo}
              onChange={(item) => handlePlaceChange(index, item)}
            />
          ))}
          <button
            type="button"
            onClick={handleAddPlace}
            className="flex items-center justify-center w-full h-12 rounded-xl border-2 border-dashed border-neutral-30 text-primary-40 body-16-semibold"
          >
            장소 추가 +
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl bg-primary-40 text-neutral-10 body-16-semibold"
            // TODO : 등록하기 버튼 스타일 추가
            // className="w-full h-12 rounded-xl bg-neutral-30 text-neutral-40 body-16-semibold"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};
