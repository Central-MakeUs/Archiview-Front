'use client';

import type { PickImageOptions, PickImageResult } from '@archiview/webview-bridge-contract';

import {
  getCurrentLocation,
  isWebViewBridgeAvailable,
  openAppSettings,
  openExternalUrl,
  openInAppBrowser,
  pickImage,
} from '@/shared/lib/native-bridge';

interface IBrowserNewTabOptions {
  features?: string;
  fallbackToCurrentTab?: boolean;
  setNoOpener?: boolean;
}

const openBrowserNewTab = (url: string, options: IBrowserNewTabOptions = {}) => {
  const tab =
    options.features === undefined
      ? window.open(url, '_blank')
      : window.open(url, '_blank', options.features);

  if (tab && options.setNoOpener) {
    tab.opener = null;
  }

  if (!tab && options.fallbackToCurrentTab) {
    window.location.href = url;
  }

  return Boolean(tab);
};

export const isAppWebView = () => isWebViewBridgeAvailable();

export const tryOpenExternalUrlViaNative = async (url: string): Promise<boolean> => {
  try {
    return await openExternalUrl(url);
  } catch {
    return false;
  }
};

export const tryOpenInAppBrowserViaNative = async (url: string): Promise<boolean> => {
  try {
    return await openInAppBrowser(url);
  } catch {
    return false;
  }
};

export const tryOpenExternalThenInAppBrowserViaNative = async (url: string): Promise<boolean> => {
  const openedByExternalUrl = await tryOpenExternalUrlViaNative(url);
  if (openedByExternalUrl) return true;
  return tryOpenInAppBrowserViaNative(url);
};

export const openExternalLinkInWebViewOrBrowser = (url: string) => {
  if (isWebViewBridgeAvailable()) {
    tryOpenExternalThenInAppBrowserViaNative(url).catch(() => undefined);
    return;
  }

  openBrowserNewTab(url, {
    fallbackToCurrentTab: true,
    setNoOpener: true,
  });
};

export const openInAppBrowserOrBrowserNewTab = async (url: string) => {
  const openedInAppBrowser = await tryOpenInAppBrowserViaNative(url);
  if (openedInAppBrowser) return;

  openBrowserNewTab(url, { features: 'noopener,noreferrer' });
};

export const requestNativeImage = async (options: PickImageOptions): Promise<PickImageResult> => {
  return pickImage(options);
};

export const openNativeAppSettings = async (): Promise<boolean> => {
  return openAppSettings();
};

export const requestNativeCurrentLocation = async () => {
  return getCurrentLocation();
};
