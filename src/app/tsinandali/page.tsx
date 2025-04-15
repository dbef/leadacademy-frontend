import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';

import { NotFoundView } from 'src/sections/error';
import { TsinandaliView } from 'src/sections/tsinandali/tsinandali';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `წინანდალი - საბადო`,
      description:`წინანდალი - საბადო`,
      keywords: 'პროგრამა, საბადო, სწავლება, განათლება',
      applicationName: 'საბადო',
      openGraph: {
        title: `წინანდალი - საბადო`,
        description: 'წინანდლის კამპუსი',
        url: `https://sabado.edu.ge/manglisi`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `წინანდალი - საბადო`,
        description: 'წინანდლის კამპუსი',
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: `წინანდალი - საბადო`,
      description: 'წინანდლის კამპუსი',
    };
  }
}

export default async function Page() {

   const campuses = await apiClient('/api/v1/campus', 'get');

   const tsinandali = campuses.find((campus) => campus.campus_name_short === 'tsinandali');

  return tsinandali ? <TsinandaliView campuse={tsinandali}/> : <NotFoundView/>;
}
