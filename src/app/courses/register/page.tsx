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
      title: `რეგისტრაცია - ${CONFIG.appName}`,
      description: 'დარეგისტრირდი კურსზე.',
      keywords: `„Sabado საზაფხულო სკოლა“, „საბადო მანგლისი“, „ლიდერობის ბანაკი
საქართველო“, „საბადო ლიდერშიპ აკადემია“`,
      applicationName: CONFIG.appName,
      openGraph: {
        title: `რეგისტრაცია - ${CONFIG.appName}`,
        description: 'დარეგისტრირდი აქ',
        url: `https://sabado.edu.ge/courses/register`,
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
        title: `რეგისტრაცია - ${CONFIG.appName}`,
        description: 'დარეგისტრირდი აქ',
      },
      metadataBase: baseUrl,
      alternates: {
        canonical: `/courses/register`,
        languages: {
          en: `/en//courses/register`,
          ka: `/courses/register`,
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `რეგისტრაცია - ${CONFIG.appName}`,
      description: 'დარეგისტრირდი აქ',
    };
  }
}

export default async function Page({ params }: Props) {
  return <RegisterOnCourseView />;
}
