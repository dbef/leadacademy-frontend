import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { AllNews } from 'src/sections/news-section/all-news';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `News - Sabado`,
      description: 'Sabado - News.',
      keywords: 'Sabadom, news, education',
      applicationName: CONFIG.appName,
      openGraph: {
        title: `News - ${CONFIG.appName}`,
        description: 'Sabado news',
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
        title: `News - ${CONFIG.appName}`,
        description: 'News',
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `News - ${CONFIG.appName}`,
      description: 'News',
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
