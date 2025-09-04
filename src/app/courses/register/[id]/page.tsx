import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';
import axios, { endpoints } from 'src/lib/axios';

import { RegisterOnCourseView } from 'src/sections/courses/course-register-view';

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
      title: `დარეგისტრირდი ${course.title_ka} - ${CONFIG.appName}`,
      description: course.short_des_ka || 'Course details and information.',
      keywords: course.keywords_ka,
      applicationName: CONFIG.appName,
      openGraph: {
        title: `${course.title_ka} - ${CONFIG.appName}`,
        description: course.short_des_ka || 'Course details and information.',
        url: `https://sabado.edu.ge/courses/register/${id}`,
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
              canonical: `/courses/register/${id}`,
              languages: {
                en: `/en//courses/register/${id}`,
                ka: `/courses/register/${id}`,
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

  return <RegisterOnCourseView course={course} />;
}

// ----------------------------------------------------------------------

async function getProduct(id: string) {
  const URL = id ? `${endpoints.product.details}?productId=${id}` : '';

  const res = await axios.get(URL);

  return res.data;
}

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 * Will remove in Next.js v15
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';
export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    const res = await axios.get(endpoints.product.list);

    return res.data.products.map((product: { id: string }) => ({ id: product.id }));
  }
  return [];
}
