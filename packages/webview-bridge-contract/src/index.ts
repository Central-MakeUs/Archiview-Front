import type { Bridge, BridgeStore } from '@webview-bridge/types';

export type NativeToken = string | null;

export type AppleNativeFullName = {
  givenName?: string | null;
  familyName?: string | null;
  middleName?: string | null;
  nickname?: string | null;
  namePrefix?: string | null;
  nameSuffix?: string | null;
};

export type AppleNativeCredential = {
  idToken: string | null;
  authorizationCode: string | null;
  user?: string | null;
  email?: string | null;
  fullName?: AppleNativeFullName | null;
};

export type AppleSignInResult =
  | {
      status: 'success';
      credential: AppleNativeCredential;
    }
  | {
      status: 'cancelled';
    }
  | {
      status: 'error';
      reason: string;
      message?: string;
    };

export type KakaoNativeCredential = {
  accessToken: string;
  refreshToken?: string | null;
  idToken?: string | null;
};

export type KakaoSignInResult =
  | {
      status: 'success';
      credential: KakaoNativeCredential;
    }
  | {
      status: 'cancelled';
    }
  | {
      status: 'error';
      reason: string;
      message?: string;
    };

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

export type PickImageSource = 'camera' | 'library';

export type PickImageError = 'permission-denied' | 'unavailable' | 'unknown';

export type PickImageAsset = {
  uri: string;
  base64?: string | null;
  fileName?: string | null;
  mimeType?: string | null;
};

export type PickImageOptions = {
  source: PickImageSource;
  base64?: boolean;
  quality?: number;
  allowsEditing?: boolean;
  aspect?: [number, number];
};

export type PickImageResult = {
  cancelled: boolean;
  error?: PickImageError;
  asset?: PickImageAsset;
};

export interface AppBridgeState extends Bridge {
  bridgeVersion: number;
  token: NativeToken;

  getBridgeVersion(): Promise<number>;
  openInAppBrowser(url: string): Promise<void>;

  openExternalUrl(url: string): Promise<boolean>;

  openAppSettings(): Promise<void>;

  pickImage(options: PickImageOptions): Promise<PickImageResult>;

  getCurrentLocation(): Promise<GeoLocation | null>;

  signInWithApple(): Promise<AppleSignInResult>;
  signInWithKakao(): Promise<KakaoSignInResult>;

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
