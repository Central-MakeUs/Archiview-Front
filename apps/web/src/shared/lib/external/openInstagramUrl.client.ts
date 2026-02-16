'use client';

import {
  isWebViewBridgeAvailable,
  openExternalUrl,
  openInAppBrowser,
} from '@/shared/lib/native-bridge';

const normalizeUrl = (rawUrl: string) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `https://${trimmed.replace(/^\/+/, '')}`;
};

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

export const openInstagramUrlDeepLinkOrPopup = (rawUrl: string) => {
  const url = normalizeUrl(rawUrl);
  if (!url) return;

  if (isWebViewBridgeAvailable()) {
    openExternalUrl(url)
      .then((opened) => {
        if (opened) return;
        return openInAppBrowser(url);
      })
      .catch(() => {
        return openInAppBrowser(url);
      })
      .catch(() => {
        return;
      });
    return;
  }

  const popup = openCenteredPopup(url, 'archiview-instagram');
  if (!popup) window.location.href = url;
};
