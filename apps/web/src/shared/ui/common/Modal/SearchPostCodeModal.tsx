'use client';

import { XIcon } from '../../icon/XIcon';
import { Modal } from './Modal';
import { useState } from 'react';
import { Button } from '../../button';
import { getKakaoAddress, IKakaoAddress } from '@/shared/lib/api/getKakaoAddress';
import { BoxInput } from '../Input/BoxInput';
import { SearchIcon } from '../../icon';

export interface IAddressCompleteData {
  placeName: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
  placeUrl: string;
  phoneNumber?: string;
}

interface ISearchPostCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: IAddressCompleteData) => void;
}

export const SearchPostCodeModal = ({ isOpen, onClose, onComplete }: ISearchPostCodeModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [kakaoAddress, setKakaoAddress] = useState<IKakaoAddress[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    getKakaoAddress(searchQuery)
      .then((data) => setKakaoAddress(data.documents ?? []))
      .catch(() => setKakaoAddress([]))
      .finally(() => setIsSearching(false));
  };

  const handleSelectAddress = (item: IKakaoAddress) => {
    onComplete({
      placeName: item.place_name ?? '',
      addressName: item.address_name ?? '',
      roadAddressName: item.road_address_name ?? item.address_name ?? '',
      latitude: Number(item.y),
      longitude: Number(item.x),
      placeUrl: item.place_url ?? '',
      phoneNumber: item.phone || undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-1/2 max-w-md">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="body-16-bold">주소검색</h2>

          <button type="button" onClick={onClose} className="p-1 text-neutral-70" aria-label="닫기">
            <XIcon className="w-3 h-3" />
          </button>
        </div>
        <div className="flex flex-col gap-7">
          <div>
            <div className="flex gap-2 mb-1">
              <BoxInput>
                <input
                  className="body-14-medium"
                  placeholder="도로명, 건물명 또는 지번 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </BoxInput>
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="w-20 h-12 p-0 shrink-0"
              >
                검색
              </Button>
            </div>
            <div className="caption-12-regular text-neutral-40">
              예) 테헤란로 152, 역삼동 737, 강남 파이낸스 센터
            </div>
          </div>
          <div className="overflow-y-auto">
            {kakaoAddress.length === 0 && (
              <div className="flex flex-col justify-center text-center items-center gap-3">
                <div>
                  <SearchIcon className="text-primary-40" />
                </div>
                <div>
                  <p className="body-14-semibold text-neutral-70">주소를 검색해주세요</p>
                  <p className="caption-12-regular text-neutral-40">
                    도로명, 지번 또는 건물명으로 검색할 수 있어요
                  </p>
                </div>
              </div>
            )}
            {kakaoAddress.length > 0 && (
              <div className="max-h-[300px] overflow-y-auto scrollbar-primary-40 flex flex-col gap-6">
                {kakaoAddress.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col border-b border-primary-20 pb-6 cursor-pointer"
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className="body-14-bold text-neutral-70 group-hover:underline"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSelectAddress(item)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSelectAddress(item)}
                      >
                        {item.address_name}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="caption-12-regular text-neutral-40 flex flex-row gap-3 items-center">
                          <div className="px-1 py-2 h-6 w-12 rounded-md bg-primary-10 text-primary-40 caption-12-regular text-center flex items-center justify-center">
                            도로명
                          </div>
                          <div
                            className="group-hover:underline"
                            role="button"
                            tabIndex={0}
                            onClick={() => handleSelectAddress(item)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSelectAddress(item)}
                          >
                            {item.road_address_name}
                          </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                          <span className="px-1 py-2 w-12 rounded-md border border-primary-40 text-primary-40 caption-12-regular h-6 text-center flex items-center justify-center">
                            장소명
                          </span>
                          <span
                            className="caption-12-semibold text-primary-40 group-hover:underline cursor-pointer"
                            role="button"
                            tabIndex={0}
                            onClick={() => handleSelectAddress(item)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSelectAddress(item)}
                          >
                            {item.place_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
