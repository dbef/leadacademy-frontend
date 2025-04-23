import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

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
};

export default async function Page() {
  return <RulesOfConduct />;
}
