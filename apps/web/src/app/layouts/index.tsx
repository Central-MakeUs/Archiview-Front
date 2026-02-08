import type { Metadata } from 'next';

import '@/shared/styles/globals.css';

import { MSWProvider } from '../providers/MSWProvider';
import { QueryProvider } from '../providers/QueryProvider';
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

export function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <html lang="en">
      <body>
        <KakaoMapScript />
        <MSWProvider>
          <QueryProvider>{children}</QueryProvider>
        </MSWProvider>
        <Toaster position="top-left" richColors className="toaster-within-content" />
      </body>
    </html>
  );
}
