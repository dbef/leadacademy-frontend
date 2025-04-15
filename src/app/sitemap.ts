import type { MetadataRoute } from 'next';

import apiClient from 'src/api/apiClient';
import { navData } from 'src/layouts/nav-config-main';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await apiClient('/api/v1/courses', 'get');

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.course_id}`,
    lastModified: new Date(course.updated_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const enCourseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/courses/${course.course_id}`,
    lastModified: new Date(course.updated_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const enPaths: MetadataRoute.Sitemap = navData.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/en${item.path}`,
    changeFrequency: 'monthly',
    priority: 1,
  }));

  const paths: MetadataRoute.Sitemap = navData.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${item.path}`,
    changeFrequency: 'monthly',
    priority: 1,
  }));

  return [...paths, ...enPaths, ...courseEntries, ...enCourseEntries];
}
