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

export const ArchiverHomePage = (): React.ReactElement => {
  useAuth();

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

  if (showLoading) return <LoadingPage text="아카이버 홈 화면으로 이동중" role="ARCHIVER" />;

  if (isError) return <div className="mb-5">에러</div>;

  const hotPlaces = hotPlaceData?.data?.places ?? [];
  const editorTrusted = editorTrustedData?.data?.editors ?? [];

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
        </div>
        <div className="p-5">
          <CategorySection />
          <HotPlaceSection hotPlaces={hotPlaces} />
          <EditorTrustedSection editors={editorTrusted} />
        </div>
      </div>
    </div>
  );
};
