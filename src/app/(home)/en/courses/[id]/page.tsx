import type { Metadata } from 'next';

import Script from 'next/script';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

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

const baseUrl = new URL('https://sabado.edu.ge');

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
      metadataBase: baseUrl,
      title: `${course.title_en} - ${CONFIG.appName}`,
      description: course.short_des_en || 'Course details and information.',
      keywords: course.keywords_en,
      applicationName: CONFIG.appName,
      openGraph: {
        title: `${course.title_en} - ${CONFIG.appName}`,
        description: course.short_des_en || 'Course details and information.',
        url: `https://sabado.edu.ge/en/courses/${id}`,
        type: 'article',
        images: [
          {
            url: course.media_course_assn[0].media?.media_url || '',
            width: 1200,
            height: 630,
            alt: course.title_en,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${course.title_en} - ${CONFIG.appName}`,
        description: course.short_des_en || 'Course details and information.',
        images: [
          {
            url: course.media_course_assn[0].media?.media_url || '',
            width: 1200,
            height: 630,
            alt: course.title_en,
          },
        ],
      },
      alternates: {
        canonical: `/en/courses/${id}`,
        languages: {
          en: `/en/courses/${id}`,
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
