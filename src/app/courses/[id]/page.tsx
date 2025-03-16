import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { CourseDetailsView } from 'src/sections/courses/course-details-view';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  try {
    const course = await apiClient('/api/v1/courses/{id}', 'get', {
      pathParams: { id },
    });

    return {
      title: `${course.title_ka} - ${CONFIG.appName}`,
      description: course.short_des_ka || 'Course details and information.',
      keywords: course.keywords_ka,
      applicationName: CONFIG.appName,
      openGraph: {
        title: `${course.title_ka} - ${CONFIG.appName}`,
        description: course.short_des_ka || 'Course details and information.',
        url: `https://sabado.edu.ge/courses/${id}`,
        type: 'article',
        images: [
          {
            url: course.media_course_assn[0].media?.media_url || '',
            width: 1200,
            height: 630,
            alt: course.title_ka,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${course.title_ka} - ${CONFIG.appName}`,
        description: course.short_des_ka || 'Course details and information.',
        images: [
          {
            url: course.media_course_assn[0].media?.media_url || '',
            width: 1200,
            height: 630,
            alt: course.title_ka,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `Course Details - ${CONFIG.appName}`,
      description: 'View course details and more information.',
    };
  }
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const course = await apiClient('/api/v1/courses/{id}', 'get', {
    pathParams: {
      id,
    },
  });

  return <CourseDetailsView course={course} />;
}
