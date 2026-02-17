'use client';

import { BottomSheetModal } from '@/shared/ui/common/BottomSheet';

interface IImageSourceBottomSheetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPickLibrary: () => void;
  onPickCamera: () => void;
}

export const ImageSourceBottomSheetModal = ({
  open,
  onOpenChange,
  onPickLibrary,
  onPickCamera,
}: IImageSourceBottomSheetModalProps) => {
  return (
    <BottomSheetModal open={open} onOpenChange={onOpenChange} height={240}>
      <div className="px-5 pt-4 pb-6">
        <p className="body-16-bold text-neutral-90">프로필 사진 업로드</p>

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            className="w-full h-11 rounded-default bg-white border border-neutral-30 body-14-medium"
            onClick={onPickLibrary}
          >
            사진 보관함
          </button>

          <button
            type="button"
            className="w-full h-11 rounded-default bg-white border border-neutral-30 body-14-medium"
            onClick={onPickCamera}
          >
            카메라 촬영
          </button>

          <button
            type="button"
            className="w-full h-11 rounded-default bg-neutral-20 body-14-medium"
            onClick={() => onOpenChange(false)}
          >
            취소
          </button>
        </div>
      </div>
    </BottomSheetModal>
  );
};
