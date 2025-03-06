import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Lead Academy: Your Learning Partner',
  description:
    'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
};

export default async function Page() {
  const courses = await apiClient('/api/v1/courses', 'get');

  return <HomeView products={courses} />;
}
