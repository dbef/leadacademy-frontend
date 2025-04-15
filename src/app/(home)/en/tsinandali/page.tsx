import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { NotFoundView } from 'src/sections/error';
import { TsinandaliView } from 'src/sections/tsinandali/tsinandali';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `Tsinandali - Sabado`,
      description: 'Tsinandali Campus',
      keywords: 'Tsinandali, sabado, education, learning',
      applicationName: 'Sabado',
      openGraph: {
        title: `Tsinandali - Sabado`,
        description: 'Tsinandali Campus',
        url: `https://sabado.edu.ge/en/tsinandali`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Tsinandali - Sabado`,
        description: 'Tsinandali Campus',
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `Tsinandali - Sabado`,
      description: 'Tsinandali Campus',
    };
  }
}

export default async function Page() {

   const campuses = await apiClient('/api/v1/campus', 'get');

   const tsinandali = campuses.find((campus) => campus.campus_name_short === 'tsinandali');

  return tsinandali ? <TsinandaliView campuse={tsinandali}/> : <NotFoundView/>;
}
