import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { LecturersDashboardView } from 'src/sections/lecturers/lecturers-dashboard-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Courses view - ${CONFIG.appName}` };

export default async function Page() {
  return <LecturersDashboardView />;
}
