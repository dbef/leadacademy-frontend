import type { Metadata } from 'next';

import Script from 'next/script';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

const baseUrl = new URL('https://sabado.edu.ge');

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: 'Sabado: Your Learning Partner',
  description: 'Your learning partner for the best programs that help you achieve your goals.',
  keywords: 'Sabado, programs, learning, education',
  applicationName: 'Sabado',
  openGraph: {
    title: 'Sabado: Your Learning Partner',
    description: 'Your learning partner for the best programs that help you achieve your goals.',
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
  alternates: {
    canonical: '/en',
    languages: {
      en: '/en',
      ka: '/',
    },
  },
};

export default async function Page() {
  const courses = await apiClient('/api/v1/courses', 'get');

  const images = await apiClient('/api/v1/gallery/cover', 'get');

  return <HomeView products={courses} images={images} />;
}
