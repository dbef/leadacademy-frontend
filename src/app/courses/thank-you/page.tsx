import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { CourseListMain } from 'src/sections/courses/courses-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Product shop - ${CONFIG.appName}` };

export default async function Page() {
  const courses = await apiClient('/api/v1/courses', 'get');

  return <CourseListMain products={courses} />;
}
