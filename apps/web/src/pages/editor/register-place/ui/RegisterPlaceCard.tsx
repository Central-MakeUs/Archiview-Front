'use client';

import { BoxInput } from '@/shared/ui/common/Input/BoxInput';
import { usePostCode } from '@/shared/hooks/usePostCode';
import { SearchPostCodeModal } from '@/shared/ui/common/Modal/SearchPostCodeModal';

import { useState, useCallback } from 'react';
import { Chip } from '@/shared/ui/Chip';
import { CaretUpCircleIcon, PictureIcon } from '@/shared/ui/icon';

const CATEGORIES = ['한식', '중식', '일식', '양식', '카페', '데이트', '이자카야', '기타'];
const MAX_CATEGORIES = 2;
// 카테고리 인덱스 + 1을 id로 사용 (1~8)
const getCategoryId = (index: number) => index + 1;

export interface IRegisterPlaceCardValue {
  placeId: number;
  name: string;
  roadAddress: string;
  detailAddress: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  categoryIds: number[];
  description: string;
}

interface ICategoryChipGroupProps {
  selectedIds: number[];
  onToggle: (id: number) => void;
}

const CategoryChipGroup = ({ selectedIds, onToggle }: ICategoryChipGroupProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map((label, index) => (
        <Chip
          key={label}
          label={label}
          selected={selectedIds.includes(getCategoryId(index))}
          onClick={() => onToggle(getCategoryId(index))}
          className="h-9 px-4 rounded-xl"
        />
      ))}
    </div>
  );
};

interface IRegisterPlaceCardProps {
  placeIndex?: number;
  value: IRegisterPlaceCardValue;
  onChange: (value: IRegisterPlaceCardValue) => void;
}

export const RegisterPlaceCard = ({ placeIndex = 1, value, onChange }: IRegisterPlaceCardProps) => {
  const { isOpen, open, close, result, handleComplete } = usePostCode();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleAddressComplete = useCallback(
    (data: { zonecode: string; roadAddress: string }) => {
      onChange({
        ...value,
        zipCode: data.zonecode,
        roadAddress: data.roadAddress,
      });
    },
    [value, onChange],
  );

  return (
    <div className="flex flex-col bg-neutral-10 px-5 py-6 rounded-default">
      <button
        type="button"
        onClick={toggleExpanded}
        className="flex justify-between items-center w-full text-left mb-0 -mb-1"
        aria-expanded={isExpanded}
      >
        <p className="body-14-semibold">장소 {placeIndex}</p>
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
              <div className="h-40 bg-neutral-30 rounded-xl flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <PictureIcon className="w-8.5 h-8.5 text-neutral-60" />
                  <div className="caption-12-semibold text-neutral-60">썸네일 등록하기</div>
                </div>
              </div>
            </div>
            <div>
              <p className="body-14-semibold mb-3">주소</p>
              <div className="flex flex-row gap-3 ">
                <BoxInput state="default" className="flex-1" onClick={open}>
                  <input
                    readOnly
                    value={result?.roadAddress ?? value.roadAddress ?? ''}
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
                    placeholder="장소에 대한 한줄 소개를 입력해주세요"
                    value={value.description}
                    onChange={(e) => onChange({ ...value, description: e.target.value })}
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

      <SearchPostCodeModal
        isOpen={isOpen}
        onClose={close}
        onComplete={(data) => {
          handleComplete(data);
          handleAddressComplete({
            zonecode: data.zonecode,
            roadAddress: data.roadAddress,
          });
        }}
      />
    </div>
  );
};
