import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';
import axios, { endpoints } from 'src/lib/axios';

import { CourseDetailsView } from 'src/sections/courses/course-details-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Product details | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const course = await apiClient('/api/v1/courses/{id}', 'get', {
    pathParams: {
      id,
    },
  });

  return <CourseDetailsView course={course} />;
}

// ----------------------------------------------------------------------

async function getProduct(id: string) {
  const URL = id ? `${endpoints.product.details}?productId=${id}` : '';

  const res = await axios.get(URL);

  return res.data;
}

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 * Will remove in Next.js v15
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';
export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    const res = await axios.get(endpoints.product.list);

    return res.data.products.map((product: { id: string }) => ({ id: product.id }));
  }
  return [];
}
