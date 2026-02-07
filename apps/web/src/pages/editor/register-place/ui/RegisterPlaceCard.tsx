'use client';

import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { usePostCode } from '@/shared/hooks/usePostCode';
import { SearchPostCodeModal } from '@/shared/ui/common/Modal/SearchPostCodeModal';

import { useState, useCallback, useRef, useEffect } from 'react';
import { CaretUpCircleIcon, PictureIcon } from '@/shared/ui/icon';
import { useEditorGetPresignedUrl } from '@/entities/editor/place/mutations/useEditorGetPresignedUrl';
import { usePutImage } from '@/entities/editor/place/mutations/usePutImage';
import { CategoryChipGroup } from './CategoryChipGroup';

const MAX_CATEGORIES = 2;

export interface IRegisterPlaceCardValue {
  placeName: string;
  description: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
  categoryIds: number[];
  nearestStationWalkTime: string;
  placeUrl: string;
  phoneNumber?: string;
  imageUrl: string;
}

interface IRegisterPlaceCardProps {
  placeIndex?: number;
  value: IRegisterPlaceCardValue;
  onChange: (value: IRegisterPlaceCardValue) => void;
  error?: string;
}

export const RegisterPlaceCard = ({
  placeIndex = 1,
  value,
  onChange,
  error,
}: IRegisterPlaceCardProps) => {
  const { isOpen, open, close } = usePostCode();
  const [isExpanded, setIsExpanded] = useState(true);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getPresignedUrl, isPending: isPresignedUrlLoading } = useEditorGetPresignedUrl();
  const { putImage, isPending: isPutImageLoading } = usePutImage();

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleAddressComplete = useCallback(
    (data: import('@/shared/ui/common/Modal/SearchPostCodeModal').IAddressCompleteData) => {
      onChange({
        ...value,
        placeName: data.placeName,
        addressName: data.addressName,
        roadAddressName: data.roadAddressName,
        latitude: data.latitude,
        longitude: data.longitude,
        placeUrl: data.placeUrl,
        nearestStationWalkTime: '테스트 10분',
        phoneNumber: data.phoneNumber,
      });
    },
    [value, onChange],
  );

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (thumbnailPreviewUrl) URL.revokeObjectURL(thumbnailPreviewUrl);
    };
  }, [thumbnailPreviewUrl]);

  const handleThumbnailFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setThumbnailPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      getPresignedUrl(
        {
          filename: file.name,
          contentType: file.type,
          size: file.size,
        },
        {
          onSuccess: (res) => {
            if (res.success && res.data?.uploadUrl && res.data?.imageUrl) {
              const { uploadUrl, imageUrl } = res.data;
              putImage(
                { uploadUrl, file },
                {
                  onSuccess: () => {
                    onChange({ ...value, imageUrl: imageUrl });
                  },
                },
              );
            }
          },
        },
      );
      e.target.value = '';
    },
    [value, onChange, getPresignedUrl, putImage],
  );

  return (
    <div className="flex flex-col bg-neutral-10 px-5 py-6 rounded-default">
      <button
        type="button"
        onClick={toggleExpanded}
        className="flex justify-between items-center w-full text-left mb-0 -mb-1"
        aria-expanded={isExpanded}
      >
        <p className="body-14-semibold">{value.placeName || `장소 ${placeIndex}`}</p>
        <CaretUpCircleIcon
          className={`w-4 h-4 text-neutral-40 transition-transform duration-300 ease-out ${isExpanded ? '' : 'rotate-180'}`}
          aria-hidden
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-400 ease-out"
        style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-5 pt-3">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                aria-hidden
                onChange={handleThumbnailFileChange}
              />
              <button
                type="button"
                onClick={handleThumbnailClick}
                disabled={isPresignedUrlLoading || isPutImageLoading}
                className="h-40 w-full bg-neutral-30 rounded-xl flex items-center justify-center overflow-hidden hover:bg-neutral-40 transition-colors disabled:opacity-60 disabled:pointer-events-none relative"
              >
                {thumbnailPreviewUrl ? (
                  <>
                    <img
                      src={thumbnailPreviewUrl}
                      alt="썸네일 미리보기"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {(isPresignedUrlLoading || isPutImageLoading) && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="caption-12-semibold text-white">업로드 중...</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <PictureIcon className="w-8.5 h-8.5 text-neutral-60" />
                    <div className="caption-12-semibold text-neutral-60">
                      {isPresignedUrlLoading || isPutImageLoading
                        ? '업로드 중...'
                        : '썸네일 등록하기'}
                    </div>
                  </div>
                )}
              </button>
            </div>
            <div>
              <p className="body-14-semibold mb-3">주소</p>
              <div className="flex flex-row gap-3 ">
                <BoxInput
                  state={error ? 'error' : 'default'}
                  message={error ?? '주소검색 버튼을 눌러주세요'}
                  className="flex-1"
                  onClick={open}
                >
                  <input
                    readOnly
                    value={value.roadAddressName}
                    placeholder="주소검색 버튼을 눌러주세요"
                  />
                </BoxInput>
                <button className="w-16 h-12 text-center body-14-semibold bg-primary-40 rounded-xl text-neutral-10">
                  입력
                </button>
              </div>
            </div>
            <div>
              <p className="body-14-semibold mb-3">장소 소개</p>
              <div className="flex flex-row gap-3 ">
                <BoxInput state="default" className="flex-1">
                  <input
                    placeholder="50자 이내로 장소를 소개해주세요"
                    value={value.description ?? ''}
                    onChange={(e) => onChange({ ...value, description: e.target.value })}
                    maxLength={50}
                  />
                </BoxInput>
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-between">
                <p className="body-14-semibold mb-3">카테고리를 설정해주세요</p>
                <p className="caption-12-medium text-primary-40">*최대 2개</p>
              </div>
              <CategoryChipGroup
                selectedIds={value.categoryIds}
                onToggle={(id) => {
                  const next = value.categoryIds.includes(id)
                    ? value.categoryIds.filter((v) => v !== id)
                    : value.categoryIds.length >= MAX_CATEGORIES
                      ? value.categoryIds
                      : [...value.categoryIds, id];
                  onChange({ ...value, categoryIds: next });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <SearchPostCodeModal isOpen={isOpen} onClose={close} onComplete={handleAddressComplete} />
    </div>
  );
};
