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

type CurrentLocationResult = Awaited<ReturnType<typeof getCurrentLocation>>;

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

const requestBrowserCurrentLocation = async (): Promise<CurrentLocationResult> => {
  if (typeof window === 'undefined' || !window.navigator.geolocation) {
    return null;
  }

  return new Promise<CurrentLocationResult>((resolve) => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy ?? undefined,
            altitude: position.coords.altitude ?? undefined,
            altitudeAccuracy: position.coords.altitudeAccuracy ?? undefined,
            heading: position.coords.heading ?? undefined,
            speed: position.coords.speed ?? undefined,
          },
          timestamp: position.timestamp,
        });
      },
      () => {
        resolve(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 30000,
      },
    );
  });
};

export const requestNativeCurrentLocation = async (): Promise<CurrentLocationResult> => {
  if (isWebViewBridgeAvailable()) {
    try {
      return await getCurrentLocation();
    } catch {
      return null;
    }
  }

  return requestBrowserCurrentLocation();
};
