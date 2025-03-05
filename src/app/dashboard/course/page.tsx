import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { CoursesDashboardView } from 'src/sections/product/view/course-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Courses view - ${CONFIG.appName}` };

export default async function Page() {
  const data = await apiClient('/api/v1/courses', 'get');

  return <CoursesDashboardView courses={data} />;
}
