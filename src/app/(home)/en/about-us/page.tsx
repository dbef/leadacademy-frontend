import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';

import { AboutView } from 'src/sections/about/view';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      metadataBase: baseUrl,
      title: `About Us - ${CONFIG.appName}`,
      description: `The work of the Academy is based on the core values that are essential for the formation of leaders, future citizens, and constitute the essential foundation of the Academy's work and each of its activities.`,
      keywords: 'Programs, Sabado, learn, education, about us, about sabado',
      applicationName: CONFIG.appName,
      openGraph: {
        title: `About Us - ${CONFIG.appName}`,
        description: `The work of the Academy is based on the core values that are essential for the formation of leaders, future citizens, and constitute the essential foundation of the Academy's work and each of its activities.`,
        url: `https://sabado.edu.ge/en/about-us`,
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
        title: `About Us - ${CONFIG.appName}`,
        description: `The work of the Academy is based on the core values that are essential for the formation of leaders, future citizens, and constitute the essential foundation of the Academy's work and each of its activities.`,
      },
      alternates: {
        canonical: '/en/about-us',
        languages: {
          en: '/en/about-us',
          ka: '/about-us',
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `About Us - ${CONFIG.appName}`,
      description: `The work of the Academy is based on the core values that are essential for the formation of leaders, future citizens, and constitute the essential foundation of the Academy's work and each of its activities.`,
    };
  }
}
export default function Page() {
  return <AboutView />;
}
