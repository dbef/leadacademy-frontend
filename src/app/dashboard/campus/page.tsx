import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CampusDashboardView } from 'src/sections/campus/campus-dashboard-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Courses view - ${CONFIG.appName}` };

export default async function Page() {
  return <CampusDashboardView />;
}
