'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Badge } from '@/shared/ui/Badge';
import { SearchBar } from '@/shared/ui/SearchBar';
import { CategorySection } from '@/entities/common/ui/CategorySection';
import { HotPlaceSection } from '@/features/archiver/place/ui/HotPlaceSection';
import { EditorTrustedSection } from '@/features/archiver/profile/ui/EditorTrustedSection';
import { useGetMyProfile } from '@/entities/archiver/profile/queries/useGetMyProfile';

export const ArchiverHomePage = (): React.ReactElement => {
  const [searchedText, setSearchedText] = useState<string>('');

  const { data: myData, isLoading, isError } = useGetMyProfile({ useMock: true });

  if (isLoading) return <div className="mb-5">로딩중...</div>;

  if (isError) return <div className="mb-5">에러</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 overflow-y-auto scroll-none">
        <div className="relative">
          <div className=" w-full bg-[#84C6FF] h-45 rounded-b-4xl px-5 pt-8 pb-13 ">
            <div className="mb-3">
              <Badge variant="contained" className="rounded-xl bg-primary-60">
                아카이버
              </Badge>
            </div>
            <div className="heading-24-bold">{myData?.data?.nickname}</div>
            <div className="body-14-regular text-primary-50">소중한 정보를 검색해보세요!</div>
          </div>
          <Image
            src="/images/MainFolderIcon.svg"
            alt="MainFolderImage"
            width={124}
            height={124}
            className="absolute top-8 right-9.75"
          />
          <Link
            href={'search-result'}
            className="absolute left-5 right-5 -bottom-5 flex items-center rounded-full bg-transparent shadow-[0_0_11px_0_rgba(144,144,144,0.40)] "
          >
            <SearchBar
              value={searchedText}
              onChange={(e) => setSearchedText(e)}
              onSubmit={() => {}}
            />
          </Link>
        </div>
        <div className="p-5">
          <CategorySection /> <HotPlaceSection /> <EditorTrustedSection />
        </div>
      </div>
    </div>
  );
};
