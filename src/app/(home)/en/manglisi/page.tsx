import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { NotFoundView } from 'src/sections/error';
import { TsinandaliView } from 'src/sections/tsinandali/tsinandali';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `Manglisi - Sabado`,
      description: 'Manglisi Campus',
      keywords: 'manglisi, sabado, education, learning',
      applicationName: 'Sabado',
      openGraph: {
        title: `Manglisi - Sabado`,
        description: 'Manglisi Campus',
        url: `https://sabado.edu.ge/en/manglisi`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Manglisi - Sabado`,
        description: 'Manglisi Campus',
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `Manglisi - Sabado`,
      description: 'Manglisi Campus',
    };
  }
}
export default async function Page() {
  const campuses = await apiClient('/api/v1/campus', 'get');

  const manglisi = campuses.find((campus) => campus.campus_name_short === 'manglisi');

  return manglisi ? <TsinandaliView campuse={manglisi} /> : <NotFoundView />;
}
