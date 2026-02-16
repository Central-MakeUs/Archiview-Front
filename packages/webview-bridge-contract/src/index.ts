import type { Bridge, BridgeStore } from '@webview-bridge/types';

export type NativeToken = string | null;

export type GeoCoordinates = {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
};

export type GeoLocation = {
  coords: GeoCoordinates;
  timestamp: number;
};

export interface AppBridgeState extends Bridge {
  bridgeVersion: number;
  token: NativeToken;

  getBridgeVersion(): Promise<number>;
  openInAppBrowser(url: string): Promise<void>;

  openExternalUrl(url: string): Promise<boolean>;

  openAppSettings(): Promise<void>;

  getCurrentLocation(): Promise<GeoLocation | null>;

  setToken(token: NativeToken): Promise<void>;
  getToken(): Promise<NativeToken>;
  clearToken(): Promise<void>;
}

export type AppBridge = BridgeStore<AppBridgeState>;

export type AppReadyPayload = {
  timestamp: number;
};

export type AuthChangedPayload = {
  token: NativeToken;
};

type AnyPostMessageSchema = Record<
  string,
  {
    validate: (data: unknown) => unknown;
  }
>;

export type AppPostMessageEventName = 'appReady' | 'authChanged';

export type AppPostMessageSchema = AnyPostMessageSchema & {
  appReady: {
    validate: (data: unknown) => AppReadyPayload;
  };
  authChanged: {
    validate: (data: unknown) => AuthChangedPayload;
  };
};
