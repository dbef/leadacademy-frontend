import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { AllNews } from 'src/sections/news-section/all-news';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `სიახლეები - საბადო`,
      description: 'Sabado - სიახლეები.',
      keywords: 'პროგრამა, საბადო, სწავლება, განათლება',
      applicationName: CONFIG.appName,
      openGraph: {
        title: `სიახლეები - ${CONFIG.appName}`,
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
        title: `სიახლეები - ${CONFIG.appName}`,
        description: 'სიახლეები',
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
  const page = searchParams?.page;

  const news = await apiClient('/api/v1/news', 'get', {
    queryParams: {
      page: Number(page) ? Number(page) : 0,
      rowsPerPage: 100,
      sortBy: 'created_at',
      direction: 'desc',
    },
  });

  return <AllNews news={news.data} />;
}
