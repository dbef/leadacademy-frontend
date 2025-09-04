import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { NotFoundView } from 'src/sections/error';
import { TsinandaliView } from 'src/sections/tsinandali/tsinandali';

import { baseUrl } from '../constants';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `წინანდალი - საბადო`,
      description: `წინანდალი - საბადო`,
      keywords: 'პროგრამა, საბადო, სწავლება, განათლება',
      applicationName: 'საბადო',
      openGraph: {
        title: `წინანდალი - საბადო`,
        description: 'წინანდლის კამპუსი',
        url: `https://sabado.edu.ge/manglisi`,
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
        title: `წინანდალი - საბადო`,
        description: 'წინანდლის კამპუსი',
      },
      metadataBase: baseUrl,
      alternates: {
        canonical: `/tsinandali`,
        languages: {
          en: `/en/tsinandali`,
          ka: `/tsinandali`,
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `წინანდალი - საბადო`,
      description: 'წინანდლის კამპუსი',
    };
  }
}

export default async function Page() {
  const campuses = await apiClient('/api/v1/campus', 'get');

  const tsinandali = campuses.find((campus) => campus.campus_name_short === 'tsinandali');

  return tsinandali ? <TsinandaliView campuse={tsinandali} /> : <NotFoundView />;
}
