import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { RegisterOnCourseView } from 'src/sections/courses/course-register-view';


type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    return {
      title: `რეგისტრაცია - ${CONFIG.appName}`,
      description: 'დარეგისტრირდი კურსზე.',
      keywords: 'საბადო, სწავლება, განათლება, კურსი, რეგისტრაცია',
      applicationName: CONFIG.appName,
      openGraph: {
        title: `რეგისტრაცია - ${CONFIG.appName}`,
        description: 'დარეგისტრირდი ახლავე',
        url: `https://sabado.edu.ge/courses/register`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `რეგისტრაცია - ${CONFIG.appName}`,
        description: 'დარეგისტრირდი ახლავე',
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `რეგისტრაცია - ${CONFIG.appName}`,
      description: 'დარეგისტრირდი ახლავე',
    };
  }
}

export default async function Page({ params }: Props) {
  return <RegisterOnCourseView />;
}
