import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';

import { CourseListMain } from 'src/sections/courses/courses-view';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `Programs - ${CONFIG.appName}`,
      metadataBase: baseUrl,
      description: 'Sabado - Programs.',
      keywords: 'Programs, Sabado, learn, education',
      applicationName: CONFIG.appName,
      openGraph: {
        title: `Programs - ${CONFIG.appName}`,
        description: 'Programs',
        url: `https://sabado.edu.ge/en/courses`,
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
        title: `Programs - ${CONFIG.appName}`,
        description: 'Programs',
      },
       alternates: {
        canonical: '/en/courses',
        languages: {
          en: '/en/courses',
          ka: '/courses',
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `Programs - ${CONFIG.appName}`,
      description: 'Programs',
    };
  }
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {

  return (
    <CourseListMain />
  );
}
