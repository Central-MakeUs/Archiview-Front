'use client';

import { useState } from 'react';

import { TabBar } from '@/shared/components/TabBar';
import { SearchBar } from '@/shared/components/SearchBar';
import { PlaceListCard } from '@/shared/components/PlaceListCard';
import { EditorResultCard } from '@/shared/components/EditorResultCard';

import { Button } from '@/shared/components/button';

import Image from 'next/image';

type SearchScope = 'all' | 'info' | 'editor';

export const HomePage = (): React.ReactElement => {
  const [scope, setScope] = useState<SearchScope>('all');
  const [input, setInput] = useState('');

  return (
    <div>
      <div className="flex justify-center items-center h-screen flex-col w-full">
        <SearchBar value={input} onChange={setInput} />
        <PlaceListCard image="" title="제목" description="내용" uploadedAt="1/2 업로드" />
        <EditorResultCard
          title="title"
          image=""
          description="내용"
          uploadedAt="1/2 업로드"
          views={10}
          saves={5}
        />
        <TabBar
          items={[
            { value: 'all', label: '전체' },
            { value: 'info', label: '정보' },
            // { key: 'editor', label: '에디터' },
          ]}
          value={scope}
          onChange={setScope}
        />
        <div className="heading-24-bold">Archiview Project Initialize</div>
        <div className="heading2">Archiview Project Initialize</div>
        <div className="heading3">Archiview Project Initialize</div>
        <div className="body1">Archiview Project Initialize</div>
        <div className="body2">Archiview Project Initialize</div>
        <div className="body3">Archiview Project Initialize</div>
        <div className="captions">Archiview Project Initialize</div>
        <div className="b1 text-neutral-50">Archiview Neutral Color</div>
        <div className="b1 text-primary-50">Archiview Primary Color</div>
        <div className="b1 text-secondary-50">Archiview Secondary Color</div>
        <div className="b1 text-error-50">Archiview Error Color</div>
        <div className="flex justify-center items-center h-screen flex-col">
          <div className="flex items-center justify-center gap-4">
            <Button variant="contained">Contained</Button>
            <Button variant="contained" disabled>
              disabled
            </Button>
          </div>
          <Button variant="outlined" fullwidth>
            Outlined Fullwidth
          </Button>
          <div className="w-full px-8">
            <Button
              variant="login"
              fullwidth
              startIcon={
                <Image src="/icons/Kakao_Icon.svg" alt="Kakao_Icon" width={24} height={24} />
              }
              className="bg-[#FEE500]"
            >
              카카오톡으로 로그인
            </Button>
            <Button
              variant="login"
              startIcon={
                <Image src="/icons/Google_Icon.svg" alt="Kakao_Icon" width={24} height={24} />
              }
              fullwidth
              className="bg-[#EAEBEC]"
            >
              구글로 로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
