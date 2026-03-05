'use client';

import { linkBridge } from '@webview-bridge/web';
import type { AppBridge, AppPostMessageSchema } from '@archiview/webview-bridge-contract';

const debug = process.env.NODE_ENV === 'development';

const createBridge = (timeout: number) => {
  return linkBridge<AppBridge, AppPostMessageSchema>({
    timeout,
    debug,
    throwOnError: false,
    onFallback: (methodName) => {
      if (debug) {
        console.warn('[native-bridge] fallback:', methodName);
      }
    },
  });
};

export const nativeBridge = createBridge(5000);
export const nativeLongTaskBridge = createBridge(60000);
