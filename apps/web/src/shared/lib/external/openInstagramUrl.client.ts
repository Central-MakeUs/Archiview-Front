'use client';

import { openExternalLinkInWebViewOrBrowser } from '@/shared/lib/native-actions';

const normalizeUrl = (rawUrl: string) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `https://${trimmed.replace(/^\/+/, '')}`;
};

export const openInstagramUrlDeepLinkOrPopup = (rawUrl: string) => {
  const url = normalizeUrl(rawUrl);
  if (!url) return;

  openExternalLinkInWebViewOrBrowser(url);
};
