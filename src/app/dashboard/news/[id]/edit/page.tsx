import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { NewsCreateEditForm } from 'src/sections/news/news-create-edit';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Product edit | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const news = await apiClient('/api/v1/news/{news_id}', 'get', {
    pathParams: {
      news_id: id,
    },
  });

  return <NewsCreateEditForm news={news} />;
}
