import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';

import { GalleryView } from 'src/sections/gallery/gallery-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Gallery - ${CONFIG.appName}`,
  metadataBase: baseUrl,
  alternates: {
    canonical: '/en/gallery',
    languages: {
      en: '/en/gallery',
      ka: '/gallery',
    },
  },
};

export default function Page() {
  return <GalleryView />;
}
