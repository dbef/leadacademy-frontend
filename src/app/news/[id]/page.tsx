import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { NewsDetailsView } from 'src/sections/news/news-details';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  try {
    const news = await apiClient('/api/v1/news/{news_id}', 'get', {
      pathParams: { news_id: id },
    });

    return {
      title: `${news.title_ka} - ${CONFIG.appName}`,
      description: news.short_des_ka || 'News details and information.',
      keywords: news.keywords_ka,
      applicationName: CONFIG.appName,
      openGraph: {
        title: `${news.title_ka} - ${CONFIG.appName}`,
        description: news.short_des_ka || 'News details and information.',
        url: `https://sabado.edu.ge/courses/${id}`,
        type: 'article',
        images: [
          {
            url: news.news_media_assn[0].media?.media_url || '',
            width: 1200,
            height: 630,
            alt: news.title_ka,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${news.title_ka} - ${CONFIG.appName}`,
        description: news.short_des_ka || 'News details and information.',
        images: [
          {
            url: news.news_media_assn[0].media?.media_url || '',
            width: 1200,
            height: 630,
            alt: news.title_ka,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `News Details - ${CONFIG.appName}`,
      description: 'View News details and more information.',
    };
  }
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const news = await apiClient('/api/v1/news/{news_id}', 'get', {
    pathParams: {
      news_id: id,
    },
  });

  return <NewsDetailsView news={news} />;
}
