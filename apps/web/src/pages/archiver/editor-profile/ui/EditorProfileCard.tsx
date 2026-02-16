import Image from 'next/image';
import { useState } from 'react';

import { Badge } from '@/shared/ui/Badge';
import { Kard } from '@/shared/ui/common/Kard';
import { DotThreeIcon, ProfileAddIcon } from '@/shared/ui/icon';
import { useFollowEditor } from '@/entities/archiver/follow/mutation/useFollowEditor';
import { useBlockEditor } from '@/entities/archiver/follow/mutation/useBlockEditor';
import {
  isWebViewBridgeAvailable,
  openExternalUrl,
  openInAppBrowser,
} from '@/shared/lib/native-bridge';

import { ReportBottomSheetModal } from './ReportBottomSheetModal';
import { ReportModal, BlockModal } from './ReportModal';

interface IEditorProfile {
  nickname: string;
  instagramId: string;
  instagramUrl: string;
  introduction: string;
  hashtags: string[];
  profileImageUrl: string;
}

interface IEditorProfileCardProps {
  editorId: string;
  editorData: IEditorProfile;
}

const isIos = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = () => /Android/.test(navigator.userAgent);

const openCenteredPopup = (url: string, name: string) => {
  const width = 480;
  const height = 800;

  const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
  const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));

  const features = [
    'popup=yes',
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    'scrollbars=yes',
    'resizable=yes',
  ].join(',');

  const popup = window.open(url, name, features);
  if (popup) popup.opener = null;
  return popup;
};

const writePopupLoading = (popup: Window) => {
  try {
    popup.document.title = 'Instagram';
    popup.document.body.style.margin = '0';
    popup.document.body.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    popup.document.body.innerHTML =
      '<div style="padding:16px;line-height:1.4;">' +
      '<div style="font-size:14px;font-weight:600;">Instagram을 여는 중...</div>' +
      '<div style="margin-top:6px;font-size:12px;color:#6b7280;">앱이 설치되어 있지 않으면 웹으로 열립니다.</div>' +
      '</div>';
  } catch {
    return;
  }
};

const openInstagramProfileDeepLinkOrPopup = (instagramId: string) => {
  const username = instagramId.trim();
  if (!username) return;

  const encodedUsername = encodeURIComponent(username);
  const webUrl = `https://www.instagram.com/${encodedUsername}/`;
  const deepLinkUrl = `instagram://user?username=${encodedUsername}`;

  const openWebUrlViaNativeOrFallback = () => {
    openInAppBrowser(webUrl)
      .then((opened) => {
        if (opened) return;
        const popup = openCenteredPopup(webUrl, 'archiview-instagram');
        if (!popup) window.location.href = webUrl;
      })
      .catch(() => {
        const popup = openCenteredPopup(webUrl, 'archiview-instagram');
        if (!popup) window.location.href = webUrl;
      });
  };

  if (isWebViewBridgeAvailable()) {
    openExternalUrl(deepLinkUrl)
      .then((opened) => {
        if (opened) return;
        openWebUrlViaNativeOrFallback();
      })
      .catch(() => {
        openWebUrlViaNativeOrFallback();
      });
    return;
  }

  const popup = openCenteredPopup('about:blank', 'archiview-instagram');
  if (popup) writePopupLoading(popup);

  if (!isIos() && !isAndroid()) {
    if (popup) popup.location.href = webUrl;
    else window.location.href = webUrl;
    return;
  }

  let didHide = false;
  const onVisibilityChange = () => {
    if (!document.hidden) return;
    didHide = true;
    document.removeEventListener('visibilitychange', onVisibilityChange);
    if (popup && !popup.closed) popup.close();
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  if (isIos()) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = deepLinkUrl;
    document.body.appendChild(iframe);
    window.setTimeout(() => {
      iframe.parentNode?.removeChild(iframe);
    }, 1000);
  } else {
    window.location.href = deepLinkUrl;
  }

  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', onVisibilityChange);
    if (didHide) return;

    if (popup && !popup.closed) popup.location.href = webUrl;
    else window.location.href = webUrl;
  }, 1400);
};

export const EditorProfileCard = ({ editorId, editorData }: IEditorProfileCardProps) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);

  const { followEditor } = useFollowEditor();
  const { blockEditor } = useBlockEditor();

  const stripHash = (tag?: string) => (tag ?? '').trim().replace(/^#/, '');

  return (
    <>
      <Kard className="bg-primary-30 overflow-hidden border-none shadow-default">
        {/* 상단(블루 영역) */}

        <div className="flex flex-row w-full gap-4 p-5">
          {/* 프로필 이미지 */}
          <div className="shrink-0">
            <div className="relative overflow-hidden h-17.5 w-17.5 rounded-full bg-neutral-30">
              <Image src={editorData.profileImageUrl} alt="" fill />
            </div>
          </div>

          {/* 텍스트 + 배지 */}
          <div className="flex flex-col flex-1">
            <div className="flex flex-row w-full items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="heading-20-bold leading-none text-primary-50">
                  {editorData.nickname}
                </div>
                <div className="body-14-semibold text-primary-10">@{editorData.instagramId}</div>
              </div>

              {/* 우측 아이콘 버튼들 */}
              <div className="shrink-0 flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openInstagramProfileDeepLinkOrPopup(editorData.instagramId);
                  }}
                  className="inline-flex items-center justify-center"
                >
                  <Image
                    src="/images/instagramColoredIcon.svg"
                    alt="인스타 아이콘"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </button>

                {/* TODO : 친추완료 시 아이콘 바꾸기 */}
                <button
                  type="button"
                  onClick={() => followEditor(editorId)}
                  className="inline-flex items-center justify-center"
                >
                  <ProfileAddIcon className="text-black" />
                </button>

                <DotThreeIcon
                  className="text-black"
                  onClick={() => {
                    setBottomSheetOpen(true);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row gap-1 mt-2">
              <Badge variant="contained" className="bg-white text-primary-30 rounded-xl">
                {stripHash(editorData.hashtags[0])}
              </Badge>
              <Badge variant="contained" className="bg-white text-primary-30 rounded-xl">
                {stripHash(editorData.hashtags[1])}
              </Badge>
            </div>
          </div>
        </div>

        {/* 하단(화이트 영역) */}
        <div className="bg-white px-5 pb-5 pt-4">
          <p className="body-14-medium text-primary-40">{editorData.introduction}</p>
        </div>
      </Kard>

      {bottomSheetOpen && (
        <ReportBottomSheetModal
          open={bottomSheetOpen}
          setOpen={setBottomSheetOpen}
          setReportModalOpen={setReportModalOpen}
          setBlockModalOpen={setBlockModalOpen}
        />
      )}

      <ReportModal
        isOpen={reportModalOpen}
        onCancel={() => {
          setReportModalOpen(false);
        }}
        // TODO : 신고 폼 연동
        onConfirm={() => {
          setReportModalOpen(false);
        }}
      />
      <BlockModal
        isOpen={blockModalOpen}
        onCancel={() => {
          setBlockModalOpen(false);
        }}
        // TODO : api 연동하기
        onConfirm={() => {
          blockEditor(editorId);
          setBlockModalOpen(false);
        }}
        editorName={'에디터 닉네임'}
      />
    </>
  );
};
