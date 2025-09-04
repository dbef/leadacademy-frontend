import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { RulesOfConduct } from 'src/sections/rules-of-conduct/rules-of-condut';

import { baseUrl } from '../constants';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `ქცების წესები - საბადო`,
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
    canonical: `/rules-of-conduct`,
    languages: {
      en: `/en/rules-of-conduct`,
      ka: `/rules-of-conduct`,
    },
  },
};

export default async function Page() {
  return <RulesOfConduct />;
}
