import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Archiview',
  authors: [
    {
      name: 'Zero Friction Team',
    },
  ],
  description: '너,나 우리의 정보 공유 플랫폼',
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
