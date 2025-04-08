import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { RulesOfConduct } from 'src/sections/rules-of-conduct/rules-of-condut';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `ქცების წესები - საბადო` };

export default async function Page() {
  return <RulesOfConduct />;
}
