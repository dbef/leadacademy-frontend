import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';

import { NotFoundView } from 'src/sections/error';
import { TsinandaliView } from 'src/sections/tsinandali/tsinandali';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `Tsinandali - Sabado`,
      description: 'Tsinandali Campus',
      keywords: 'Tsinandali, sabado, education, learning',
      applicationName: 'Sabado',
      openGraph: {
        title: `Tsinandali - Sabado`,
        description: 'Tsinandali Campus',
        url: `https://sabado.edu.ge/en/tsinandali`,
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
        title: `Tsinandali - Sabado`,
        description: 'Tsinandali Campus',
      },
      metadataBase: baseUrl,
      alternates: {
        canonical: `/en/tsinandali`,
        languages: {
          en: `/en/tsinandali`,
          ka: `/tsinandali`,
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `Tsinandali - Sabado`,
      description: 'Tsinandali Campus',
    };
  }
}

export default async function Page() {
  const campuses = await apiClient('/api/v1/campus', 'get');

  const tsinandali = campuses.find((campus) => campus.campus_name_short === 'tsinandali');

  return tsinandali ? <TsinandaliView campuse={tsinandali} /> : <NotFoundView />;
}
