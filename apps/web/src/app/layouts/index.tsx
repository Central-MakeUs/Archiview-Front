import type { Metadata } from 'next';

import '@/shared/styles/globals.css';

import { MSWProvider } from '../providers/MSWProvider';

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
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
