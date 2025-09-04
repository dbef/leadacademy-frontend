import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';

import { RegisterOnCourseView } from 'src/sections/courses/course-register-view';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    return {
      metadataBase: baseUrl,
      title: `Register - ${CONFIG.appName}`,
      description: 'Register on a course and start learning.',
      keywords: 'Sabado, leadAcademy,Lead Academy, course, register, learn',
      applicationName: CONFIG.appName,
      openGraph: {
        title: `Register - ${CONFIG.appName}`,
        description: 'Register on a course and start learning.',
        url: `https://sabado.edu.ge/en/courses/register`,
        type: 'article',
        images: [
          {
            url: `${CONFIG.assetsDir}/assets/background/main-thumb.jpg`,
            width: 1200,
            height: 630,
            alt: 'Sabado',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Register - ${CONFIG.appName}`,
        description: 'Register on a course and start learning.',
      },
      alternates: {
        canonical: '/en/courses/register',
        languages: {
          en: '/en/courses/register',
          ka: '/courses/register',
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `Register- ${CONFIG.appName}`,
      description: 'Register on a course and start learning.',
    };
  }
}

export default async function Page({ params }: Props) {
  return <RegisterOnCourseView />;
}
