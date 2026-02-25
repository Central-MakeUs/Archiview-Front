'use client';

import Image from 'next/image';

import { Badge } from '@/shared/ui/Badge';
import { CategorySection } from '@/entities/common/ui/CategorySection';
import { HotPlaceSection } from '@/features/archiver/place/ui/HotPlaceSection';
import { EditorTrustedSection } from '@/features/archiver/profile/ui/EditorTrustedSection';
import { useGetMyProfile } from '@/entities/archiver/profile/queries/useGetMyProfile';
import { useGetHotPlace } from '@/entities/archiver/place/queries/useGetHotPlace';
import { useGetEditorTrusted } from '@/entities/archiver/profile/queries/useGetEditorTrusted';
import { useAuth } from '@/entities/auth/hooks/useAuth';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { useMinLoading } from '@/shared/hooks/useMinLoading';
import { SearchBar } from '@/shared/ui/SearchBar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const ArchiverHomePage = (): React.ReactElement => {
  useAuth();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const {
    data: myData,
    isLoading: isMyProfileLoading,
    isError: isMyProfileError,
  } = useGetMyProfile({ useMock: false });
  const {
    data: hotPlaceData,
    isLoading: isHotPlaceLoading,
    isError: isHotPlaceError,
  } = useGetHotPlace({ useMock: false });
  const {
    data: editorTrustedData,
    isLoading: isEditorTrustedLoading,
    isError: isEditorTrustedError,
  } = useGetEditorTrusted({ useMock: false });

  const isLoading = isMyProfileLoading || isHotPlaceLoading || isEditorTrustedLoading;
  const isError = isMyProfileError || isHotPlaceError || isEditorTrustedError;
  const showLoading = useMinLoading(isLoading);

  if (showLoading) return <LoadingPage text="아카이버 홈 화면으로 이동중입니다." role="ARCHIVER" />;

  if (isError) return <div className="mb-5">에러</div>;

  const hotPlaces = hotPlaceData?.data?.places ?? [];
  const editorTrusted = editorTrustedData?.data?.editors ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 overflow-y-auto scroll-none">
        <div className="relative">
          <div className="w-full bg-[#84C6FF] h-45 rounded-b-4xl px-5 pt-8 pb-16">
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
          <div className="absolute left-5 right-5 bottom-0 translate-y-1/2">
            <SearchBar
              placeholder="게시물 URL 또는 키워드를 검색해보세요."
              value={searchValue}
              onChange={(value) => {
                setSearchValue(value);
              }}
              onSubmit={() => {
                router.push(`/archiver/search-result?search=${searchValue}`);
              }}
              className="shadow-default"
            />
          </div>
        </div>
        <div className="p-5 pt-12">
          <CategorySection />
          <HotPlaceSection hotPlaces={hotPlaces} />
          <EditorTrustedSection editors={editorTrusted} />
        </div>
      </div>
    </div>
  );
};
