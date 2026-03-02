import type { Metadata, Viewport } from 'next';

import '@/shared/styles/globals.css';

import { QueryProvider } from '../providers/QueryProvider';
import { NativeBridgeProvider } from '../providers/NativeBridgeProvider';
import { SsgoiProvider } from '../providers/SsgoiProvider';
import { KakaoMapScript } from '@/shared/lib/map/KakaoMapScript';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Archiview',
  authors: [
    {
      name: 'Zero Friction Team',
    },
  ],
  description: '너,나 우리의 정보 공유 플랫폼',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <html lang="en">
      <body>
        <KakaoMapScript />
        <NativeBridgeProvider>
          <QueryProvider>
            <SsgoiProvider>{children}</SsgoiProvider>
          </QueryProvider>
        </NativeBridgeProvider>
        <Toaster position="top-center" richColors className="toaster-within-content" />
      </body>
    </html>
  );
}
