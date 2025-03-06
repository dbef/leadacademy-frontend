import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { RegisterOnCourseView } from 'src/sections/courses/course-register-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Register on program | - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  return <RegisterOnCourseView />;
}
