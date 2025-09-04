import type { Metadata } from 'next';

import Script from 'next/script';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';

import { CourseDetailsView } from 'src/sections/courses/course-details-view';

type Props = {
  params: { id: string };
};

let jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Rooted & Rising – Summer School',
  description: 'Leadership & citizenship non-formal education program',
  startDate: '2025-07-10',
  endDate: '2025-07-20',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: { '@type': 'Place', name: 'Manglisi Campus', address: 'Manglisi, Georgia' },
  organizer: { '@type': 'Organization', name: 'Sabado' },
  image: ['https://www.sabado.edu.ge/_next/image/?q=75&url=%2Flogo%2FMainLogo.png&w=128'],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  try {
    const course = await apiClient('/api/v1/courses/{id}', 'get', {
      pathParams: { id },
    });

    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: course.title_en,
      description: course.description_en,
      startDate: course.start_date,
      endDate: course.end_date,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: 'Manglisi Campus', address: 'Manglisi, Georgia' },
      organizer: { '@type': 'Organization', name: 'Sabado' },
      image: [course?.media_course_assn[0]?.media?.media_url || ''],
    };

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
      metadataBase: baseUrl,
      alternates: {
        canonical: `/courses/${id}`,
        languages: {
          en: `/en//courses/${id}`,
          ka: `/courses/${id}`,
        },
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

  return (
    <>
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CourseDetailsView course={course} />
    </>
  );
}
