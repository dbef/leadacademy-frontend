import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { SeptemberEvent } from 'src/components/september-event/september-event';

import { baseUrl } from '../constants';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `ღონისძიება - ${CONFIG.appName}`,
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
    canonical: `/september-event`,
    languages: {
      en: `/en/september-event`,
      ka: `/september-event`,
    },
  },
};

export default function Page() {
  return <SeptemberEvent />;
}
