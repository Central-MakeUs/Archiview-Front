'use client';

import { useState, useCallback } from 'react';
import { useEditorPlacePost } from '@/entities/editor/place/mutations/useEditorPlacePost';
import { InstagramUrlInput, HashTagInput } from './ui/RegisterPlaceInput';
import { RegisterPlaceCard, IRegisterPlaceCardValue } from './ui/RegisterPlaceCard';

const createDefaultPlace = (): IRegisterPlaceCardValue => ({
  placeId: 0,
  name: '',
  roadAddress: '',
  detailAddress: '',
  zipCode: '',
  latitude: 0,
  longitude: 0,
  categoryIds: [],
  description: '',
});

export const RegisterPlacePage = () => {
  const [instagramUrl, setInstagramUrl] = useState('');
  const [hashTag, setHashTag] = useState('');
  const [placeInfos, setPlaceInfos] = useState<IRegisterPlaceCardValue[]>([createDefaultPlace()]);
  const { createEditorPost } = useEditorPlacePost();

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
    createEditorPost({
      url: instagramUrl,
      hashTag,
      placeInfoRequestList: placeInfos,
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
            className="w-full h-12 rounded-xl bg-neutral-30 text-neutral-40 body-16-semibold"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};
