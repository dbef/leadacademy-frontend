import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { HomeView } from 'src/sections/home/view';

import { baseUrl } from '../constants';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'საბადო: საუკეთესო პროგრამები',
  keywords: `Sabado საზაფხულო სკოლა“, „საბადო მანგლისი“, „ლიდერობის ბანაკი
საქართველო“, „საბადო ლიდერშიპ აკადემია“`,
  description: 'საბადო - საუკეთესო პროგრამები, რომლებიც დაგეხმარებათ თქვენი მიზნების მიღწევაში.',
  openGraph: {
    title: 'საბადო: საუკეთესო პროგრამები',
    description: 'საბადო - საუკეთესო პროგრამები, რომლებიც დაგეხმარებათ თქვენი მიზნების მიღწევაში.',
    url: 'https://sabado.edu.ge/en',
    type: 'website',
    images: [
      {
        url: `${CONFIG.assetsDir}/assets/background/main-thumb.jpg`,
        width: 1200,
        height: 630,
        alt: 'Sabado',
      },
    ],
  },
     metadataBase: baseUrl,
        alternates: {
          canonical: `/`,
          languages: {
            en: `/en/`,
            ka: `/`,
          },
        },
};

export default async function Page() {
  const courses = await apiClient('/api/v1/courses', 'get');

  const images = await apiClient('/api/v1/gallery/cover', 'get');

  return <HomeView products={courses} images={images} />;
}
