import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { baseUrl } from 'src/app/constants';

import { TermsAndConditionsView } from 'src/sections/terms-and-conditions/terms-and-conditions';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Terms and conditions - ${CONFIG.appName}`,
  metadataBase: baseUrl,
  alternates: {
    canonical: `/en/terms-and-conditions`,
    languages: {
      en: `/en/terms-and-conditions`,
      ka: `/terms-and-conditions`,
    },
  },
};

export default async function Page() {
  return <TermsAndConditionsView />;
}
