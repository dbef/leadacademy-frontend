import { Iconify } from 'src/components/iconify';

import type { NavMainProps } from './main/nav/types';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  {
    title_en: 'About Sabado',
    title: 'საბადოს შესახებ',
    path: '/about-us',
    icon: <Iconify width={22} icon="fluent:info-28-filled" />, // Info/about
    children: [
      {
        subheader: '',
        items: [
          { title: 'მისია', title_en: 'Mission', path: '/about-us/?key=mission' },
          { title: 'ხედვა', title_en: 'Vision', path: '/about-us/?key=vision' },
          { title: 'ფასეულობები', title_en: 'Values', path: '/about-us/?key=values' },
          { title: 'გუნდი', title_en: 'Team', path: '/about-us/?key=team' },
          { title: 'დამფუძნებლები', title_en: 'Founders', path: '/about-us/?key=founders' },
          { title: 'პარტნიორები', title_en: 'Partners', path: '/about-us/?key=partners' },
        ],
      },
    ],
  },
  {
    title_en: 'Programs',
    title: 'პროგრამები',
    path: '/courses',
    icon: <Iconify width={22} icon="mdi:book-open-variant" />, // Education
    children: [
      {
        subheader: '',
        items: [
          { title: 'მიმდინარე', title_en: 'Ongoing', path: '/courses?status=ongoing' },
          { title: 'დასრულებული', title_en: 'Completed', path: '/courses?status=completed' },
        ],
      },
    ],
  },
  {
    title: 'სიახლეები',
    title_en: 'News',
    path: '/news',
    icon: <Iconify width={22} icon="tabler:news" />, // Education
  },
  {
    title_en: 'Gallery',
    title: 'გალერია',
    path: '/gallery',
    icon: <Iconify width={22} icon="mdi:image-multiple" />, // Gallery
  },
  // {
  //   title_en: 'Tsinandali',
  //   title: 'წინანდალი',
  //   path: '/tsinandali',
  //   icon: <Iconify width={22} icon="mdi:map-marker" />,
  //   children: [
  //     {
  //       subheader: '',
  //       items: [
  //         { title: 'კამპუსი', title_en: 'Campus', path: '/tsinandali/?key=tsinandali' },
  //         { title: 'პროგრამები', title_en: 'Programs', path: '/courses/?key=tsinandali' },
  //         { title: 'ქცევის წესები', title_en: 'Rules of conduct', path: '/rules-of-conduct' },
  //       ],
  //     },
  //   ],
  // },
  {
    title_en: 'Manglisi',
    title: 'მანგლისი',
    path: '/manglisi',
    icon: <Iconify width={22} icon="mdi:map-marker" />,
    children: [
      {
        subheader: '',
        items: [
          { title: 'კამპუსი', title_en: 'Campus', path: '/manglisi/?key=manglisi' },
          { title: 'პროგრამები', title_en: 'Programs', path: '/courses/?key=manglisi' },
          { title: 'ქცევის წესები', title_en: 'Rules of conduct', path: '/rules-of-conduct' },
        ],
      },
    ],
  },
];
