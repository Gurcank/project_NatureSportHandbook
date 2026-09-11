import type { Metadata } from 'next';
import {
  Caveat,
  Indie_Flower,
  Kalam,
  Nothing_You_Could_Do,
  Reenie_Beanie,
  Shadows_Into_Light,
} from 'next/font/google';
import LanguageToggle from '@/components/LanguageToggle';
import PencilDefs from '@/components/PencilDefs';
import { SettingsProvider } from '@/context/SettingsContext';
import './globals.css';

// One handwriting face for the whole handbook. latin-ext carries the Turkish
// diacritics the content needs.
const kalam = Kalam({
  variable: '--font-kalam',
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

// The five faces `Handwritten` deals from. They are only ever used for the
// book's own name on the title leaf, so latin alone covers them.
const caveat = Caveat({ variable: '--font-caveat', subsets: ['latin'], display: 'swap' });
const indieFlower = Indie_Flower({
  variable: '--font-indie-flower',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});
const nothingYouCouldDo = Nothing_You_Could_Do({
  variable: '--font-nothing-you-could-do',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});
const reenieBeanie = Reenie_Beanie({
  variable: '--font-reenie-beanie',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});
const shadowsIntoLight = Shadows_Into_Light({
  variable: '--font-shadows-into-light',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const handwriting = [
  kalam.variable,
  caveat.variable,
  indieFlower.variable,
  nothingYouCouldDo.variable,
  reenieBeanie.variable,
  shadowsIntoLight.variable,
].join(' ');

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nature & Sport Handbook',
    template: '%s',
  },
  description: 'Field-ready notes for nature and sport explorers',
  openGraph: {
    title: 'Nature & Sport Handbook',
    description: 'Field-ready notes for nature and sport explorers',
    type: 'website',
    siteName: 'Nature & Sport Handbook',
  },
  twitter: {
    card: 'summary',
    title: 'Nature & Sport Handbook',
    description: 'Field-ready notes for nature and sport explorers',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${handwriting} h-full antialiased`}>
      <body className="min-h-full overflow-x-hidden">
        <PencilDefs />
        <SettingsProvider>
          <LanguageToggle />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
