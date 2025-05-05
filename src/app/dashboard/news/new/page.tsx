import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { NewsCreateView } from 'src/sections/news/views';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Create a new news | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <NewsCreateView />;
}
