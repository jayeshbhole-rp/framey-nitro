import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nitro Frames | Router Protocol',
  description: 'Cheapest and fastest bridge in one frame, right in your feed.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='h-full min-h-screen bg-[#130F09]'>{children}</body>
    </html>
  );
}
