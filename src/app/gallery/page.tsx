import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { GalleryView } from 'src/sections/gallery/gallery-view';

import { baseUrl } from '../constants';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `გალერია - ${CONFIG.appName}`,
  openGraph: {
    images: [
      {
        url: `${CONFIG.assetsDir}/assets/background/main-thumb.jpg`,
        width: 1200,
        height: 630,
        alt: 'Sabado',
      },
    ],
  },
  metadataBase: baseUrl,
  alternates: {
    canonical: `/gallery`,
    languages: {
      en: `/en/gallery`,
      ka: `/gallery`,
    },
  },
};

export default function Page() {
  return <GalleryView />;
}
