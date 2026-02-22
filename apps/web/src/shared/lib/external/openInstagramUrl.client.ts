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

const openInBrowserNewTab = (url: string) => {
  const newTab = window.open(url, '_blank');
  if (newTab) {
    newTab.opener = null;
    return;
  }

  window.location.href = url;
};

const openInWebView = async (url: string) => {
  try {
    const opened = await openExternalUrl(url);
    if (opened) return;
    await openInAppBrowser(url);
  } catch {
    try {
      await openInAppBrowser(url);
    } catch {
      return;
    }
  }
};

export const openInstagramUrlDeepLinkOrPopup = (rawUrl: string) => {
  const url = normalizeUrl(rawUrl);
  if (!url) return;

  if (isWebViewBridgeAvailable()) {
    openInWebView(url).catch(() => undefined);
    return;
  }

  openInBrowserNewTab(url);
};
