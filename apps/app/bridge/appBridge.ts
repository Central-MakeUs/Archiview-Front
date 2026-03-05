import * as ImagePicker from 'expo-image-picker';
import * as WebBrowser from 'expo-web-browser';
import * as Location from 'expo-location';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Linking, Platform } from 'react-native';
import { login as kakaoLogin } from '@react-native-seoul/kakao-login';

import { bridge } from '@webview-bridge/react-native';
import type {
  AppleNativeFullName,
  AppleSignInResult,
  AppBridgeState,
  GeoLocation,
  KakaoSignInResult,
  PickImageAsset,
  PickImageOptions,
  PickImageResult,
} from '@archiview/webview-bridge-contract';

const toPickImageAsset = (asset: ImagePicker.ImagePickerAsset): PickImageAsset => {
  return {
    uri: asset.uri,
    base64: asset.base64 ?? null,
    fileName: asset.fileName ?? null,
    mimeType: asset.mimeType ?? null,
  };
};

const toAppleFullName = (
  fullName: AppleAuthentication.AppleAuthenticationFullName | null,
): AppleNativeFullName | null => {
  if (!fullName) return null;

  return {
    givenName: fullName.givenName ?? null,
    familyName: fullName.familyName ?? null,
    middleName: fullName.middleName ?? null,
    nickname: fullName.nickname ?? null,
    namePrefix: fullName.namePrefix ?? null,
    nameSuffix: fullName.nameSuffix ?? null,
  };
};

const getErrorCode = (error: unknown): string | null => {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return null;
  }

  const code = (error as { code?: unknown }).code;
  return typeof code === 'string' ? code : null;
};

const getErrorMessage = (error: unknown): string | undefined => {
  if (typeof error !== 'object' || error === null || !('message' in error)) {
    return undefined;
  }

  const message = (error as { message?: unknown }).message;
  return typeof message === 'string' ? message : undefined;
};

const isCancelledError = (error: unknown): boolean => {
  const message = getErrorMessage(error);
  if (!message) return false;

  return /cancel/i.test(message);
};

export const appBridge = bridge<AppBridgeState>(({ get, set }) => ({
  bridgeVersion: 1,
  token: null,

  async getBridgeVersion() {
    return get().bridgeVersion;
  },

  async openInAppBrowser(url: string) {
    await WebBrowser.openBrowserAsync(url);
  },

  async openExternalUrl(url: string) {
    if (Platform.OS === 'ios') {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) return false;
    }

    try {
      await Linking.openURL(url);
      return true;
    } catch {
      return false;
    }
  },

  async openAppSettings() {
    await Linking.openSettings();
  },

  async pickImage(options: PickImageOptions): Promise<PickImageResult> {
    const { source, base64 = false, quality, allowsEditing, aspect } = options;

    try {
      if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          return { cancelled: false, error: 'permission-denied' };
        }

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64,
          quality,
          allowsEditing,
          aspect,
        });

        if (result.canceled) {
          return { cancelled: true };
        }

        const asset = result.assets?.[0];
        if (!asset) return { cancelled: false, error: 'unknown' };

        return {
          cancelled: false,
          asset: toPickImageAsset(asset),
        };
      }

      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        return { cancelled: false, error: 'permission-denied' };
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64,
        quality,
        allowsEditing,
        aspect,
      });

      if (result.canceled) {
        return { cancelled: true };
      }

      const asset = result.assets?.[0];
      if (!asset) return { cancelled: false, error: 'unknown' };

      return {
        cancelled: false,
        asset: toPickImageAsset(asset),
      };
    } catch {
      return { cancelled: false, error: 'unknown' };
    }
  },

  async getCurrentLocation(): Promise<GeoLocation | null> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      coords: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy ?? undefined,
        altitude: location.coords.altitude ?? undefined,
        altitudeAccuracy: location.coords.altitudeAccuracy ?? undefined,
        heading: location.coords.heading ?? undefined,
        speed: location.coords.speed ?? undefined,
      },
      timestamp: location.timestamp,
    };
  },

  async signInWithApple(): Promise<AppleSignInResult> {
    if (Platform.OS !== 'ios') {
      return {
        status: 'error',
        reason: 'unsupported-platform',
        message: 'Apple login is only available on iOS',
      };
    }

    const isAvailable = await AppleAuthentication.isAvailableAsync();

    if (!isAvailable) {
      return {
        status: 'error',
        reason: 'unavailable',
        message: 'Apple login is unavailable on this device',
      };
    }

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      return {
        status: 'success',
        credential: {
          idToken: credential.identityToken ?? null,
          authorizationCode: credential.authorizationCode ?? null,
          user: credential.user ?? null,
          email: credential.email ?? null,
          fullName: toAppleFullName(credential.fullName ?? null),
        },
      };
    } catch (error) {
      const code = getErrorCode(error);

      if (code === 'ERR_REQUEST_CANCELED') {
        return { status: 'cancelled' };
      }

      return {
        status: 'error',
        reason: code ?? 'sign-in-failed',
        message: getErrorMessage(error),
      };
    }
  },

  async signInWithKakao(): Promise<KakaoSignInResult> {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
      return {
        status: 'error',
        reason: 'unsupported-platform',
        message: 'Kakao login is only available on iOS or Android',
      };
    }

    try {
      const token = await kakaoLogin();

      if (!token?.accessToken) {
        return {
          status: 'error',
          reason: 'missing-access-token',
          message: 'Kakao login returned no accessToken',
        };
      }

      return {
        status: 'success',
        credential: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken ?? null,
          idToken: token.idToken ?? null,
        },
      };
    } catch (error) {
      if (isCancelledError(error)) {
        return { status: 'cancelled' };
      }

      return {
        status: 'error',
        reason: getErrorCode(error) ?? 'sign-in-failed',
        message: getErrorMessage(error),
      };
    }
  },

  async setToken(token) {
    set({ token });
  },

  async getToken() {
    return get().token;
  },

  async clearToken() {
    set({ token: null });
  },
}));
