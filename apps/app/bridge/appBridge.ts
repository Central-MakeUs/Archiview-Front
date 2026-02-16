import * as WebBrowser from 'expo-web-browser';
import * as Location from 'expo-location';
import { Linking, Platform } from 'react-native';

import { bridge } from '@webview-bridge/react-native';
import type { AppBridgeState, GeoLocation } from '@archiview/webview-bridge-contract';

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
