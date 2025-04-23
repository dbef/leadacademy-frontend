import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { CourseListMain } from 'src/sections/courses/courses-view';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `პროგრამები - ${CONFIG.appName}`,
      description: 'Sabado - პროგრამები.',
      keywords: 'პროგრამა, საბადო, სწავლება, განათლება',
      applicationName: CONFIG.appName,
      openGraph: {
        title: `პროგრამები - ${CONFIG.appName}`,
        description: 'დარეგისტრირდი აქ',
        url: `https://sabado.edu.ge/courses/register`,
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
  const location = searchParams?.key;
  const season = searchParams?.season;

  const courses = await apiClient('/api/v1/courses', 'get', {
    queryParams: {
      location: location ? location : '',
      season: season ? season : '',
    },
  });

  return (
    <CourseListMain products={courses} location={location ? location : 'all'} season={season} />
  );
}
