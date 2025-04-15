import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { NotFoundView } from 'src/sections/error';
import { ManglisiView } from 'src/sections/manglisi/manglisi';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `მანგლისი - საბადო`,
      description:`მანგლისი - საბადო`,
      keywords: 'პროგრამა, საბადო, სწავლება, განათლება',
      applicationName: 'საბადო',
      openGraph: {
        title: `მანგლისი - საბადო`,
        description: 'მანგლისის კამპუსი',
        url: `https://sabado.edu.ge/manglisi`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `მანგლისი - საბადო`,
        description: 'მანგლისის კამპუსი',
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `მანგლისი - საბადო`,
      description: 'მანგლისის კამპუსი',
    };
  }
}
export default async function Page() {
  const campuses = await apiClient('/api/v1/campus', 'get');

  const manglisi = campuses.find((campus) => campus.campus_name_short === 'manglisi');

  return manglisi ? <ManglisiView campuse={manglisi} /> : <NotFoundView />;
}
