import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { NewsDashboardView } from 'src/sections/news/views/news-list-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `News view - ${CONFIG.appName}` };

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
  return <NewsDashboardView news={news.data}/>
}