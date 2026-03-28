'use client';

import Image from 'next/image';
import { Link } from '@/shared/lib/i18n/navigation';

import { Badge } from '@/shared/ui/Badge';
import { CategorySection } from '@/entities/common/ui/CategorySection';
import { HotPlaceSection } from '@/features/archiver/place/ui/HotPlaceSection';
import { EditorTrustedSection } from '@/features/archiver/profile/ui/EditorTrustedSection';
import { useGetMyProfile } from '@/entities/archiver/profile/queries/useGetMyProfile';
import { useGetHotPlace } from '@/entities/archiver/place/queries/useGetHotPlace';
import { useGetEditorTrusted } from '@/entities/archiver/profile/queries/useGetEditorTrusted';
import { useAuth } from '@/entities/auth/hooks/useAuth';
import { consumeRoleSwitchLoadingFlag } from '@/shared/constants/roleSwitchLoading';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { useMinLoading } from '@/shared/hooks/useMinLoading';
import { SearchBar } from '@/shared/ui/SearchBar';
import { consumeArchiverHomeScrollBottomFlag } from '@/shared/constants/archiverHomeScroll';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ErrorPage } from '@/shared/ui/common/Error/ErrorPage';
import type { IHotPlace } from '@/entities/archiver/place/model/archiverPlace.type';
import type { IEditor } from '@/entities/archiver/profile/model/archiverProfile.type';
import { useHomeInitialSwapIntro } from '@/shared/hooks/useHomeInitialSwapIntro';

const EMPTY_HOT_PLACES: IHotPlace[] = [];
const EMPTY_EDITORS: IEditor[] = [];

export const ArchiverHomePage = (): React.ReactElement => {
  const t = useTranslations('archiverHome');
  useAuth();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showRoleSwitchLoading] = useState(() => consumeRoleSwitchLoadingFlag());
  const [shouldScrollToBottom] = useState(() => consumeArchiverHomeScrollBottomFlag());
  const isIntroEntered = useHomeInitialSwapIntro();

  const {
    data: myData,
    isLoading: isMyProfileLoading,
    isError: isMyProfileError,
  } = useGetMyProfile({ useMock: false, optimizeForNavigation: true });
  const {
    data: hotPlaceData,
    isLoading: isHotPlaceLoading,
    isError: isHotPlaceError,
  } = useGetHotPlace({ useMock: false, optimizeForNavigation: true });
  const {
    data: editorTrustedData,
    isLoading: isEditorTrustedLoading,
    isError: isEditorTrustedError,
  } = useGetEditorTrusted({ useMock: false, optimizeForNavigation: true });

  const isLoading = isMyProfileLoading || isHotPlaceLoading || isEditorTrustedLoading;
  const isError = isMyProfileError || isHotPlaceError || isEditorTrustedError;
  const showLoading = useMinLoading(isLoading);

  useEffect(() => {
    if (!shouldScrollToBottom || showLoading) return;

    let rafId = 0;
    rafId = window.requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      container.scrollTo({ top: container.scrollHeight, behavior: 'auto' });
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [shouldScrollToBottom, showLoading]);

  if (showRoleSwitchLoading && showLoading) {
    return <LoadingPage text={t('roleSwitchLoading')} role="ARCHIVER" />;
  }

  if (isError) return <ErrorPage />;

  const hotPlaces = hotPlaceData?.data?.places ?? EMPTY_HOT_PLACES;
  const editorTrusted = editorTrustedData?.data?.editors ?? EMPTY_EDITORS;
  const introClassName = isIntroEntered ? 'translate-x-0' : 'translate-x-4';

  return (
    <div
      className={`flex min-h-screen flex-col transition-transform duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none ${introClassName}`}
    >
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scroll-none">
        <div className="relative">
          <div className="w-full bg-[#84C6FF] h-45 rounded-b-4xl px-5 pt-8 pb-16">
            <div className="mb-3">
              <Badge variant="contained" className="rounded-xl bg-primary-60">
                {t('badge')}
              </Badge>
            </div>
            <div className="heading-24-bold">{myData?.data?.nickname}</div>
            <div className="body-14-regular text-primary-50">{t('tagline')}</div>
          </div>
          <Image
            preload={true}
            src="/images/MainFolderIcon.svg"
            alt={t('folderImageAlt')}
            width={124}
            height={124}
            className="absolute top-8 right-9.75"
          />
          <div className="absolute left-5 right-5 bottom-0 translate-y-1/2">
            <Link
              href="/archiver/search-result"
              aria-label={t('searchAriaLabel')}
              className="absolute inset-0 z-10 rounded-full"
            />
            <SearchBar
              readOnly
              placeholder={t('searchPlaceholder')}
              value=""
              onChange={() => undefined}
              onSubmit={() => undefined}
              className="shadow-default"
            />
          </div>
        </div>
        <div className="p-5 pt-12">
          <CategorySection />
          <HotPlaceSection hotPlaces={hotPlaces} isLoading={showLoading} />
          <EditorTrustedSection editors={editorTrusted} isLoading={showLoading} />
        </div>
      </div>
    </div>
  );
};
