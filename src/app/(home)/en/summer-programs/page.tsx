import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';

import { SummerProgramsView } from 'src/sections/courses/summer-programs-view';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Summer Programs - ${CONFIG.appName}`,
    description: 'Sabado - Summer Programs.',
    keywords: 'Summer Programs, Sabado, summer school, leadership academy',
    applicationName: CONFIG.appName,
    openGraph: {
      title: `Summer Programs - ${CONFIG.appName}`,
      description: 'Summer Programs',
      url: `https://sabado.edu.ge/en/summer-programs`,
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
      title: `Summer Programs - ${CONFIG.appName}`,
      description: 'Summer Programs',
    },
    metadataBase: baseUrl,
    alternates: {
      canonical: '/en/summer-programs',
      languages: {
        en: '/en/summer-programs',
        ka: '/summer-programs',
      },
    },
  };
}

export default function Page() {
  return <SummerProgramsView />;
}
