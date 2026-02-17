'use client';

import type {
  GeoLocation,
  NativeToken,
  PickImageOptions,
  PickImageResult,
} from '@archiview/webview-bridge-contract';

import { nativeBridge } from './bridge.client';

export const isWebViewBridgeAvailable = () => nativeBridge.isWebViewBridgeAvailable;

export const isNativeMethodAvailable = (methodName: string) => {
  return nativeBridge.isNativeMethodAvailable(methodName);
};

export const getBridgeVersion = async (): Promise<number | null> => {
  if (!nativeBridge.isNativeMethodAvailable('getBridgeVersion')) {
    return null;
  }
  return nativeBridge.getBridgeVersion();
};

export const openInAppBrowser = async (url: string): Promise<boolean> => {
  if (!nativeBridge.isNativeMethodAvailable('openInAppBrowser')) {
    return false;
  }
  await nativeBridge.openInAppBrowser(url);
  return true;
};

export const openExternalUrl = async (url: string): Promise<boolean> => {
  if (!nativeBridge.isNativeMethodAvailable('openExternalUrl')) {
    return false;
  }
  return nativeBridge.openExternalUrl(url);
};

export const openAppSettings = async (): Promise<boolean> => {
  if (!nativeBridge.isNativeMethodAvailable('openAppSettings')) {
    return false;
  }
  await nativeBridge.openAppSettings();
  return true;
};

export const pickImage = async (options: PickImageOptions): Promise<PickImageResult> => {
  if (!nativeBridge.isNativeMethodAvailable('pickImage')) {
    return { cancelled: false, error: 'unavailable' };
  }
  return nativeBridge.pickImage(options);
};

export const getCurrentLocation = async (): Promise<GeoLocation | null> => {
  if (!nativeBridge.isNativeMethodAvailable('getCurrentLocation')) {
    return null;
  }
  return nativeBridge.getCurrentLocation();
};

export const setToken = async (token: NativeToken): Promise<boolean> => {
  if (!nativeBridge.isNativeMethodAvailable('setToken')) {
    return false;
  }
  await nativeBridge.setToken(token);
  return true;
};

export const getToken = async (): Promise<NativeToken | null> => {
  if (!nativeBridge.isNativeMethodAvailable('getToken')) {
    return null;
  }
  return nativeBridge.getToken();
};

export const clearToken = async (): Promise<boolean> => {
  if (!nativeBridge.isNativeMethodAvailable('clearToken')) {
    return false;
  }
  await nativeBridge.clearToken();
  return true;
};
