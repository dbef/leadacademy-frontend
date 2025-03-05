import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CampusNewEditForm } from 'src/sections/campus/campus-create-edit-form';


// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Create a new campus | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CampusNewEditForm />;
}
