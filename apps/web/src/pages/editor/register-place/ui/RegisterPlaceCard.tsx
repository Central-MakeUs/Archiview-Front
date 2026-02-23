'use client';

import { useFormContext, Controller, FieldPath, FieldPathValue } from 'react-hook-form';
import { useState, useCallback, useRef, useEffect } from 'react';

import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { usePostCode } from '@/shared/hooks/usePostCode';
import { SearchPostCodeModal } from '@/shared/ui/common/Modal/SearchPostCodeModal';
import { CaretUpCircleIcon, PictureIcon, XIcon } from '@/shared/ui/icon';
import { useEditorGetPresignedUrl } from '@/entities/editor/place/mutations/useEditorGetPresignedUrl';
import { usePutImage } from '@/entities/editor/place/mutations/usePutImage';
import { CategoryChipGroup } from './CategoryChipGroup';
import { registerPlaceSchema } from '../model/place.schema';
import z from 'zod';
import { IAddressValues } from '../model/place.types';

const MAX_CATEGORIES = 2;

interface IRegisterPlaceCardProps {
  placeIndex: number;
  canDelete: boolean;
  onRemove: () => void;
}

export const RegisterPlaceCard = ({ placeIndex, canDelete, onRemove }: IRegisterPlaceCardProps) => {
  const index = placeIndex - 1;
  const base = `placeInfoRequestList.${index}` as const;

  const { control, setValue, watch, formState } =
    useFormContext<z.infer<typeof registerPlaceSchema>>();
  const value = watch(base);
  const error = formState.errors?.placeInfoRequestList?.[index];

  const { isOpen, open, close } = usePostCode();
  const [isExpanded, setIsExpanded] = useState(true);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getPresignedUrl } = useEditorGetPresignedUrl();
  const { putImage } = usePutImage();

  const setFormValue = useCallback(
    <TName extends FieldPath<z.infer<typeof registerPlaceSchema>>>(
      name: TName,
      value: FieldPathValue<z.infer<typeof registerPlaceSchema>, TName>,
    ) => {
      setValue(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const handleAddressComplete = useCallback(
    (data: IAddressValues) => {
      setFormValue(`${base}.placeName`, data.placeName);
      setFormValue(`${base}.addressName`, data.addressName);
      setFormValue(`${base}.roadAddressName`, data.roadAddressName);
      setFormValue(`${base}.latitude`, data.latitude);
      setFormValue(`${base}.longitude`, data.longitude);
      setFormValue(`${base}.placeUrl`, data.placeUrl);
      setFormValue(`${base}.phoneNumber`, data.phoneNumber);
      setFormValue(`${base}.nearestStationWalkTime`, '도보 10분');
    },
    [base, setFormValue],
  );

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setThumbnailPreviewUrl(preview);

    getPresignedUrl(
      { filename: file.name, contentType: file.type, size: file.size },
      {
        onSuccess: (res) => {
          if (!res.success) return;

          putImage(
            { uploadUrl: res.data?.uploadUrl ?? '', file },
            {
              onSuccess: () => {
                setFormValue(`${base}.imageUrl`, res.data?.imageUrl ?? '');
              },
            },
          );
        },
      },
    );

    e.target.value = '';
  };

  useEffect(() => {
    return () => {
      if (thumbnailPreviewUrl) URL.revokeObjectURL(thumbnailPreviewUrl);
    };
  }, [thumbnailPreviewUrl]);

  return (
    <div className="flex flex-col bg-neutral-10 px-5 py-6 rounded-default">
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className="flex justify-between items-center w-full text-left"
      >
        <p className="body-14-semibold">{value?.placeName || `장소 ${placeIndex}`}</p>
        <CaretUpCircleIcon
          className={`w-4 h-4 transition-transform ${isExpanded ? '' : 'rotate-180'} text-neutral-40`}
        />
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-5 pt-4">
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleThumbnailFileChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-40 w-full bg-neutral-30 rounded-xl flex items-center justify-center overflow-hidden"
          >
            {thumbnailPreviewUrl || value?.imageUrl ? (
              <img
                src={thumbnailPreviewUrl ?? value?.imageUrl}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <PictureIcon className="w-8 h-8 text-neutral-60" />
            )}
          </button>

          <Controller
            name={`${base}.roadAddressName`}
            control={control}
            render={({ field }) => (
              <BoxInput
                state={error?.roadAddressName ? 'error' : 'default'}
                message={error?.roadAddressName?.message}
                onClick={open}
              >
                <input {...field} readOnly placeholder="주소 검색" />
              </BoxInput>
            )}
          />

          <Controller
            name={`${base}.description`}
            control={control}
            render={({ field }) => (
              <BoxInput>
                <input {...field} maxLength={50} placeholder="50자 이내로 장소를 소개해주세요" />
              </BoxInput>
            )}
          />

          <CategoryChipGroup
            selectedIds={value?.categoryIds ?? []}
            onToggle={(id) => {
              const next = value.categoryIds.includes(id)
                ? value.categoryIds.filter((v: number) => v !== id)
                : value.categoryIds.length >= MAX_CATEGORIES
                  ? value.categoryIds
                  : [...value.categoryIds, id];

              setFormValue(`${base}.categoryIds`, next);
            }}
          />

          {canDelete && (
            <div className="flex items-center justify-end w-full">
              <button type="button" onClick={onRemove} className="flex items-center gap-1">
                <span className="body-14-semibold text-neutral-60">이 장소 삭제</span>
                <XIcon className="w-3 h-3 text-neutral-60" />
              </button>
            </div>
          )}
        </div>
      )}

      <SearchPostCodeModal isOpen={isOpen} onClose={close} onComplete={handleAddressComplete} />
    </div>
  );
};
