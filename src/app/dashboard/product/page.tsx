import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { CoursesDashboardView } from 'src/sections/product/view/course-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Courses view - ${CONFIG.appName}` };

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const isPublished = searchParams?.isPublished;

  const courses = await apiClient('/api/v1/courses', 'get', {
    queryParams: {
      is_published: isPublished ? isPublished : 'all',
    },
  });
  return <CoursesDashboardView courses={courses} isPublished={isPublished}/>;
}
