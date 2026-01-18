'use client';

import { useCallback, useState } from 'react';
import type { Address } from 'react-daum-postcode';

export interface IAddressResponse {
  zonecode: string; // 우편번호
  address: string; // 선택된 주소(기본)
  roadAddress: string; // 도로명
  jibunAddress: string; // 지번
  buildingName?: string;
  bname?: string;
}

export const usePostCode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<IAddressResponse | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const handleComplete = useCallback((data: Address) => {
    setResult({
      zonecode: data.zonecode,
      address: data.address,
      roadAddress: data.roadAddress,
      jibunAddress: data.jibunAddress,
      buildingName: data.buildingName,
      bname: data.bname,
    });
    setIsOpen(false);
  }, []);

  return { isOpen, open, close, result, handleComplete };
};
