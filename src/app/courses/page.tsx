import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CourseListMain } from 'src/sections/courses/courses-view';

import { baseUrl } from '../constants';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `პროგრამები - ${CONFIG.appName}`,
      description: 'Sabado - პროგრამები.',
      keywords: `„Sabado საზაფხულო სკოლა“, „საბადო მანგლისი“, „ლიდერობის ბანაკი
საქართველო“, „საბადო ლიდერშიპ აკადემია“`,
      applicationName: CONFIG.appName,
      openGraph: {
        title: `პროგრამები - ${CONFIG.appName}`,
        description: 'დარეგისტრირდი აქ',
        url: `https://sabado.edu.ge/courses`,
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
        title: `პროგრამები - ${CONFIG.appName}`,
        description: 'დარეგისტრირდი აქ',
      },
      metadataBase: baseUrl,
      alternates: {
        canonical: `/courses`,
        languages: {
          en: `/en/courses`,
          ka: `/courses`,
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `პროგრამები - ${CONFIG.appName}`,
      description: 'დარეგისტრირდი აქ',
    };
  }
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  return <CourseListMain />;
}
