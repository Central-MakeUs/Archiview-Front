'use client';

import Image from 'next/image';
import { useRef, useState, useMemo, useEffect } from 'react';

import { useEditorGetPresignedUrl } from '@/entities/editor/place/mutations/useEditorGetPresignedUrl';
import { usePutImage } from '@/entities/editor/place/mutations/usePutImage';
import { useEditorGetMyProfile } from '@/entities/editor/profile/queries/useEditorGetMyProfile';
import { useEditEditorProfile } from '@/entities/editor/profile/mutations/useEditEditorProfile';
import { CheckBoxIcon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';
import { IntroductionInput } from '@/entities/editor/profile/ui/IntroductionInput';
import { NickNameInput } from '@/entities/editor/profile/ui/NickNameInput';
import { InstagramUrlInput } from '@/entities/editor/profile/ui/InstagramUrlInput';
import { InstagramIdInput } from '@/entities/editor/profile/ui/InstagramIdInput';
import { HashTagInput } from '@/entities/editor/profile/ui/HashTagInput';
import { toast } from 'sonner';
import { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { useQueryClient } from '@tanstack/react-query';
import { editorKeys } from '@/shared/lib/query-keys';
import { LoadingPage } from '@/shared/ui/common/Loading/LoadingPage';
import { CameraPermissionModal } from '@/shared/ui/permission/CameraPermissionModal';
import { ImageSourceBottomSheetModal } from '@/shared/ui/permission/ImageSourceBottomSheetModal';
import { isWebViewBridgeAvailable, openAppSettings, pickImage } from '@/shared/lib/native-bridge';

export const EditProfilePage = () => {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { data: profileData, isLoading } = useEditorGetMyProfile();
  const { mutate: editProfile } = useEditEditorProfile();

  const [profileImagePreViewUrl, setProfileImagePreViewUrl] = useState<string>('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const [isNicknameDisabled, setIsNicknameDisabled] = useState(false);
  const [isInstagramIdDisabled, setIsInstagramIdDisabled] = useState(false);
  const [isInstagramUrlDisabled, setIsInstagramUrlDisabled] = useState(false);
  const [isCameraPermissionModalOpen, setIsCameraPermissionModalOpen] = useState(false);
  const [isImageSourceSheetOpen, setIsImageSourceSheetOpen] = useState(false);

  // 서버에서 가져온 프로필 데이터로 초기값 세팅
  useEffect(() => {
    if (!profileData?.data) return;

    const profile = profileData.data;
    setNickname(profile.nickname ?? '');
    setIntroduction(profile.introduction ?? '');
    setInstagramId(profile.instagramId ?? '');
    setInstagramUrl(profile.instagramUrl ?? '');
    setHashtags(profile.hashtags ?? []);
    setProfileImageUrl(profile.profileImageUrl ?? '');
    setProfileImagePreViewUrl(profile.profileImageUrl ?? '');
  }, [profileData]);

  const { getPresignedUrl } = useEditorGetPresignedUrl();
  const { putImage } = usePutImage();

  const openFilePicker = () => {
    const input = fileRef.current;
    if (!input) return;

    if (isWebViewBridgeAvailable()) {
      setIsImageSourceSheetOpen(true);
      return;
    }

    input.click();
  };

  const uploadFile = (file: File) => {
    const preview = URL.createObjectURL(file);
    setProfileImagePreViewUrl(preview);

    getPresignedUrl(
      { filename: file.name, contentType: file.type, size: file.size },
      {
        onSuccess: (res) => {
          if (!res.success) return;

          putImage(
            { uploadUrl: res.data?.uploadUrl ?? '', file },
            {
              onSuccess: () => {
                setProfileImageUrl(res.data?.imageUrl ?? '');
              },
            },
          );
        },
      },
    );
  };

  const pickImageFromNative = async (source: 'camera' | 'library') => {
    setIsImageSourceSheetOpen(false);

    const res = await pickImage({ source, base64: true });

    if (res.error === 'unavailable') {
      fileRef.current?.click();
      return;
    }

    if (res.error === 'permission-denied') {
      setIsCameraPermissionModalOpen(true);
      return;
    }

    if (res.cancelled) return;

    if (!res.asset?.base64) return;

    const mimeType = res.asset.mimeType ?? 'image/jpeg';
    const fileName = res.asset.fileName ?? `profile.${mimeType.includes('png') ? 'png' : 'jpg'}`;

    const binary = atob(res.asset.base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    const file = new File([bytes], fileName, { type: mimeType });
    uploadFile(file);
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadFile(file);

    e.target.value = '';
  };

  const payload = useMemo(
    () => ({
      profileImageUrl,
      nickname,
      introduction,
      instagramId,
      instagramUrl,
      hashtags,
    }),
    [profileImageUrl, nickname, introduction, instagramId, instagramUrl, hashtags],
  );

  const isSubmitEnabled = useMemo(() => {
    const hasProfileImage = !!profileImageUrl;
    const hasNickname = nickname.trim().length > 0;
    const hasIntroduction = introduction.trim().length <= 50 && introduction.trim().length > 0;
    const hasInstagramId = instagramId.trim().length > 0;
    const hasInstagramUrl = instagramUrl.trim().length > 0;
    const hasHashtags = hashtags.length === 2;

    const allRequiredInputsDisabled =
      isNicknameDisabled && isInstagramIdDisabled && isInstagramUrlDisabled;

    return (
      hasProfileImage &&
      hasNickname &&
      hasInstagramId &&
      hasInstagramUrl &&
      hasHashtags &&
      hasIntroduction &&
      allRequiredInputsDisabled
    );
  }, [
    profileImageUrl,
    nickname,
    introduction,
    instagramId,
    instagramUrl,
    hashtags,
    isNicknameDisabled,
    isInstagramIdDisabled,
    isInstagramUrlDisabled,
  ]);

  const handleSubmit = () => {
    if (!isSubmitEnabled) return;

    editProfile(payload, {
      onSuccess: async () => {
        toast.success('프로필 수정 완료');
        await queryClient.invalidateQueries({
          queryKey: editorKeys.getEditorMeProfile.all.queryKey,
        });
      },
      onError: (error) => {
        const kyError = error as ExtendedKyHttpError;
        toast.error(kyError.errorData?.message ?? error.message ?? '알 수 없는 오류');
      },
    });
  };

  if (isLoading) {
    return <LoadingPage text="프로필 정보를 불러오는 중입니다." role="EDITOR" />;
  }

  return (
    <div className="px-5 flex flex-col h-full overflow-y-auto">
      <CameraPermissionModal
        isOpen={isCameraPermissionModalOpen}
        onClose={() => setIsCameraPermissionModalOpen(false)}
        onOpenSettings={async () => {
          try {
            await openAppSettings();
          } finally {
            setIsCameraPermissionModalOpen(false);
          }
        }}
      />

      <ImageSourceBottomSheetModal
        open={isImageSourceSheetOpen}
        onOpenChange={setIsImageSourceSheetOpen}
        onPickLibrary={() => {
          void pickImageFromNative('library');
        }}
        onPickCamera={() => {
          void pickImageFromNative('camera');
        }}
      />

      <div className="flex flex-col gap-5">
        <div className="pt-6 flex justify-center">
          <button
            type="button"
            onClick={openFilePicker}
            className="relative h-22.5 w-22.5 rounded-full bg-neutral-20 overflow-hidden"
            aria-label="프로필 이미지 업로드"
          >
            {/* 미리보기 */}
            {profileImagePreViewUrl ? (
              <Image
                src={profileImagePreViewUrl}
                alt="프로필 미리보기"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-neutral-40 text-sm">
                프로필 사진 업로드
              </div>
            )}
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleThumbnailFileChange}
          />
        </div>

        <div>
          <div className="flex flex-row justify-between mb-3">
            <p className="body-14-semibold">닉네임</p>
            <p className="caption-12-medium text-primary-40">*필수</p>
          </div>
          <NickNameInput
            value={nickname}
            onChange={setNickname}
            disabledCheck={!nickname || nickname.length > 6}
            onDisabledChange={setIsNicknameDisabled}
            initialValidated
          />
        </div>

        <div>
          <div className="flex flex-row justify-between mb-3">
            <p className="body-14-semibold">한줄소개</p>
            <p className="caption-12-medium text-primary-40">*필수</p>
          </div>
          <IntroductionInput value={introduction} onChange={setIntroduction} />
        </div>

        <div>
          <div className="flex flex-row justify-between mb-3">
            <p className="body-14-semibold">인스타그램 아이디</p>
            <p className="caption-12-medium text-primary-40">*필수</p>
          </div>
          <InstagramIdInput
            value={instagramId}
            onChange={setInstagramId}
            onDisabledChange={setIsInstagramIdDisabled}
            initialValidated
          />
        </div>

        <div>
          <div className="flex flex-row justify-between mb-3">
            <p className="body-14-semibold">인스타그램 URL</p>
            <p className="caption-12-medium text-primary-40">*필수</p>
          </div>
          <InstagramUrlInput
            value={instagramUrl}
            onChange={setInstagramUrl}
            onDisabledChange={setIsInstagramUrlDisabled}
            initialValidated
          />
        </div>

        <div>
          <div className="flex flex-row justify-between mb-3">
            <p className="body-14-semibold">나를 표현하는 해시태그를 자유롭게 설정해보세요!</p>
            <p className="caption-12-medium text-primary-40">*2개 필수</p>
          </div>
          <HashTagInput value={hashtags} onChange={setHashtags} max={2} />
        </div>

        <div className="flex flex-row items-center justify-center">
          <CheckBoxIcon
            onClick={() => setIsChecked((v) => !v)}
            className={cn(
              'text-neutral-40 w-4 mr-2',
              isChecked ? 'text-primary-40' : 'text-neutral-40',
            )}
          />
          <span className={cn('caption-12-regular')}>
            일부 정보는 다른 사용자에게 공개될 수 있어요.
          </span>
        </div>
      </div>

      <div className="pb-5 pt-3">
        <Button disabled={!isSubmitEnabled} onClick={handleSubmit} className="w-full">
          수정완료
        </Button>
      </div>
    </div>
  );
};
