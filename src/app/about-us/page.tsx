import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { AboutView } from 'src/sections/about/view';

import { baseUrl } from '../constants';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `ჩვენს შესახებ - საბადო`,
      description: `აკადემიის მუშაობა ეფუძნება იმ ძირითად ფასეულობებს, რომლებიც ლიდერების, მომავლის მოქალაქეების ჩამოყალიბებისთვის აუცილებელია და აკადემიის საქმიანობის, მისი თითოეული აქტივობის აუცილებელ საფუძველს წარმოადგენს.`,
      keywords: 'პროგრამა, საბადო, სწავლება, განათლება',
      applicationName: CONFIG.appName,
      openGraph: {
        title: 'საბადო - ჩვენს შესახებ.',
        description: `აკადემიის მუშაობა ეფუძნება იმ ძირითად ფასეულობებს, რომლებიც ლიდერების, მომავლის მოქალაქეების ჩამოყალიბებისთვის აუცილებელია და აკადემიის საქმიანობის, მისი თითოეული აქტივობის აუცილებელ საფუძველს წარმოადგენს.`,
        url: `https://sabado.edu.ge/about-us`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'საბადო - ჩვენს შესახებ.',
        description: `აკადემიის მუშაობა ეფუძნება იმ ძირითად ფასეულობებს, რომლებიც ლიდერების, მომავლის მოქალაქეების ჩამოყალიბებისთვის აუცილებელია და აკადემიის საქმიანობის, მისი თითოეული აქტივობის აუცილებელ საფუძველს წარმოადგენს.`,
      },
      metadataBase: baseUrl,
      alternates: {
        canonical: `/about-us`,
        languages: {
          en: `/en/about-us`,
          ka: `/about-us`,
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch course metadata:', error);

    return {
      title: 'საბადო - ჩვენს შესახებ.',
      description: `აკადემიის მუშაობა ეფუძნება იმ ძირითად ფასეულობებს, რომლებიც ლიდერების, მომავლის მოქალაქეების ჩამოყალიბებისთვის აუცილებელია და აკადემიის საქმიანობის, მისი თითოეული აქტივობის აუცილებელ საფუძველს წარმოადგენს.`,
    };
  }
}

export default function Page() {
  return <AboutView />;
}
