import './globals.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Providers from '@/context/Providers';
import BackgroundImage from '@/components/BackgroundImage';

const nunito = Nunito({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'i Weather',
  description: 'Weather App with React and Next',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning className={nunito.className}>
        <Providers>
          <BackgroundImage/>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
