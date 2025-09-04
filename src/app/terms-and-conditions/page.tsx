import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { TermsAndConditionsView } from 'src/sections/terms-and-conditions/terms-and-conditions';

import { baseUrl } from '../constants';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Terms and conditions - ${CONFIG.appName}`,
  metadataBase: baseUrl,
  alternates: {
    canonical: `/terms-and-conditions`,
    languages: {
      en: `/en/terms-and-conditions`,
      ka: `/terms-and-conditions`,
    },
  },
};

export default async function Page() {
  return <TermsAndConditionsView />;
}
