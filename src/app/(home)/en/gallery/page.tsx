import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { GalleryView } from 'src/sections/gallery/gallery-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Gallery - ${CONFIG.appName}` };

export default function Page() {
  return <GalleryView />;
}
