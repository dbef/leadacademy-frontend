import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';

import { ApplicantsTable } from 'src/sections/application/applicants';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Courses view - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  return <ApplicantsTable course_id={id} />;
}
