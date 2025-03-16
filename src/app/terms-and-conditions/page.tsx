import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getPosts } from 'src/actions/blog-ssr';

import { PostListHomeView } from 'src/sections/blog/view';
import { TermsAndConditionsView } from 'src/sections/terms-and-conditions/terms-and-conditions';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Terms and conditions - ${CONFIG.appName}` };

export default async function Page() {
  return <TermsAndConditionsView />;
}
