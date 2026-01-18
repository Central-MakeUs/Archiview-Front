'use client';

import { BoxInput } from '@/shared/ui/common/Input/BoxInput';

export const RegisterPlaceCard = () => {
  return (
    <div className="px-5 py-6 rounded-default">
      <div className="flex flex-row gap-3 bg-neutral-10">
        <BoxInput state="success" className="flex-1">
          <input placeholder="주소검색 버튼을 눌러주세요" />
        </BoxInput>
        <button className="w-16 h-12 text-center body-14-semibold bg-primary-40 rounded-xl text-neutral-10">
          입력
        </button>
      </div>
    </div>
  );
};
