import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { SummerProgramsView } from 'src/sections/courses/summer-programs-view';

import { baseUrl } from '../../constants';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `საზაფხულო პროგრამები - ${CONFIG.appName}`,
    description: 'Sabado - საზაფხულო პროგრამები.',
    keywords: `„Sabado საზაფხულო სკოლა", „საბადო მანგლისი", „საზაფხულო პროგრამები საქართველო", „საბადო ლიდერშიპ აკადემია"`,
    applicationName: CONFIG.appName,
    openGraph: {
      title: `საზაფხულო პროგრამები - ${CONFIG.appName}`,
      description: 'საზაფხულო პროგრამები',
      url: `https://sabado.edu.ge/summer-programs`,
      type: 'article',
      images: [
        {
          url: `${CONFIG.assetsDir}/assets/background/main-thumb.jpg`,
          width: 1200,
          height: 630,
          alt: 'Sabado',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `საზაფხულო პროგრამები - ${CONFIG.appName}`,
      description: 'საზაფხულო პროგრამები',
    },
    metadataBase: baseUrl,
    alternates: {
      canonical: `/summer-programs`,
      languages: {
        en: `/en/summer-programs`,
        ka: `/summer-programs`,
      },
    },
  };
}

export default function Page() {
  return <SummerProgramsView />;
}
