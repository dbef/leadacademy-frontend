import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';

import { RulesOfConduct } from 'src/sections/rules-of-conduct/rules-of-condut';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Rules of conduct - Sabado`,

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
    canonical: `/en/rules-of-conduct`,
    languages: {
      en: `/en/rules-of-conduct`,
      ka: `/rules-of-conduct`,
    },
  },
};

export default async function Page() {
  return <RulesOfConduct />;
}
