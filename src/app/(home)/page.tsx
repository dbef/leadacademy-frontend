import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'საბადო: საუკეთესო პროგრამები',
  keywords: 'საბადო, პროგრამები, სწავლა, განათლება',
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
};

export default async function Page() {
  const courses = await apiClient('/api/v1/courses', 'get');

  return <HomeView products={courses} />;
}
