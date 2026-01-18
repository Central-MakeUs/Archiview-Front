'use client';

import { useState } from 'react';

import { KakaoMap } from '@/shared/ui/KakaoMap';
import { BottomSheet } from '@/shared/ui/common/BottomSheet/BottomSheet';

import { SelectButtonGroup } from './SelectButtonGroup';

export const MyArchiverPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col min-h-0">
      <SelectButtonGroup />
        <div className="px-5 py-3">
      </div>
      <div className="flex-1 min-h-0">
        <KakaoMap lat={37.5665} lng={126.978} level={3} />
      </div>
      <BottomSheet isOpen={open} onOpenChange={setOpen} height={500} peekHeight={72}>
        <div className="px-5 pb-6">
          <div className="flex h-15 items-center bg-amber-200">업로드한 장소 1</div>
          <div className="flex h-15 items-center bg-amber-300">업로드한 장소 1</div>
          <div className="flex h-15 items-center bg-amber-400">업로드한 장소 1</div>
          <div className="flex h-15 items-center bg-amber-500">업로드한 장소 1</div>
          <div className="flex h-15 items-center bg-amber-600">업로드한 장소 1</div>
          <div className="flex h-15 items-center bg-amber-700">업로드한 장소 1</div>
          <div className="flex h-15 items-center bg-amber-800">업로드한 장소 1</div>
          <div className="flex h-15 items-center bg-amber-200">업로드한 장소 1</div>
          <div className="flex h-15 items-center bg-amber-300">업로드한 장소 1</div>
          <div className="flex h-15 items-center bg-amber-400">업로드한 장소 1</div>
        </div>
      </BottomSheet>
    </div>
  );
};
